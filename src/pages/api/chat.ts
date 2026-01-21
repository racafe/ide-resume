// Chat API Endpoint - Secure server-side proxy for Gemini API
// Keeps API key secure by making all AI calls server-side

export const prerender = false;

import type { APIRoute } from 'astro';
import { sendMessage, type GeminiMessage } from '../../lib/gemini';

// ============================================================================
// Types
// ============================================================================

interface ChatRequest {
  message: string;
  history?: GeminiMessage[];
}

interface ChatResponse {
  response: string;
  error?: never;
}

interface ChatErrorResponse {
  error: string;
  response?: never;
}

// ============================================================================
// Input Validation & Sanitization
// ============================================================================

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 50;
const MAX_HISTORY_MESSAGE_LENGTH = 4000;

/**
 * Sanitizes user input by removing potentially harmful content
 * - Strips HTML tags
 * - Removes null bytes
 * - Trims whitespace
 * - Normalizes unicode
 */
function sanitizeInput(input: string): string {
  return (
    input
      // Remove null bytes
      .replace(/\0/g, '')
      // Strip HTML tags
      .replace(/<[^>]*>/g, '')
      // Normalize unicode to prevent homograph attacks
      .normalize('NFKC')
      // Trim whitespace
      .trim()
  );
}

/**
 * Validates the chat request body
 */
function validateRequest(body: unknown): { valid: true; data: ChatRequest } | { valid: false; error: string } {
  // Check if body is an object
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object' };
  }

  const { message, history } = body as Record<string, unknown>;

  // Validate message
  if (typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string' };
  }

  const sanitizedMessage = sanitizeInput(message);

  if (sanitizedMessage.length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (sanitizedMessage.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
    };
  }

  // Validate history if provided
  let validatedHistory: GeminiMessage[] = [];

  if (history !== undefined) {
    if (!Array.isArray(history)) {
      return { valid: false, error: 'History must be an array' };
    }

    if (history.length > MAX_HISTORY_LENGTH) {
      return {
        valid: false,
        error: `History exceeds maximum length of ${MAX_HISTORY_LENGTH} messages`,
      };
    }

    for (let i = 0; i < history.length; i++) {
      const item = history[i];

      if (!item || typeof item !== 'object') {
        return { valid: false, error: `History item ${i} must be an object` };
      }

      const { role, parts } = item as Record<string, unknown>;

      if (role !== 'user' && role !== 'model') {
        return {
          valid: false,
          error: `History item ${i} has invalid role (must be 'user' or 'model')`,
        };
      }

      if (!Array.isArray(parts) || parts.length === 0) {
        return {
          valid: false,
          error: `History item ${i} must have a non-empty parts array`,
        };
      }

      const firstPart = parts[0] as Record<string, unknown>;
      if (!firstPart || typeof firstPart.text !== 'string') {
        return {
          valid: false,
          error: `History item ${i} must have a text part`,
        };
      }

      const sanitizedText = sanitizeInput(firstPart.text);

      if (sanitizedText.length > MAX_HISTORY_MESSAGE_LENGTH) {
        return {
          valid: false,
          error: `History item ${i} exceeds maximum length of ${MAX_HISTORY_MESSAGE_LENGTH} characters`,
        };
      }

      validatedHistory.push({
        role,
        parts: [{ text: sanitizedText }],
      });
    }
  }

  return {
    valid: true,
    data: {
      message: sanitizedMessage,
      history: validatedHistory,
    },
  };
}

// ============================================================================
// API Route Handler
// ============================================================================

export const POST: APIRoute = async ({ request }) => {
  // Verify content type
  const contentType = request.headers.get('Content-Type');
  if (!contentType?.includes('application/json')) {
    return new Response(
      JSON.stringify({
        error: 'Content-Type must be application/json',
      } satisfies ChatErrorResponse),
      {
        status: 415,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        error: 'Invalid JSON in request body',
      } satisfies ChatErrorResponse),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Validate request
  const validation = validateRequest(body);
  if (!validation.valid) {
    return new Response(
      JSON.stringify({
        error: validation.error,
      } satisfies ChatErrorResponse),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const { message, history } = validation.data;

  // Call Gemini API server-side
  try {
    const response = await sendMessage(message, { history });

    return new Response(
      JSON.stringify({
        response,
      } satisfies ChatResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Log error server-side for debugging (never expose to client)
    console.error('Gemini API error:', error);

    // Return generic error to client
    return new Response(
      JSON.stringify({
        error: 'Failed to generate response. Please try again.',
      } satisfies ChatErrorResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
