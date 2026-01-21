// Rate Limiter - Prevents API abuse with per-session and per-IP limits
// Configurable via environment variables:
// - CHAT_RATE_LIMIT_SESSION: Max requests per session (default: 50)
// - CHAT_RATE_LIMIT_IP_HOURLY: Max requests per IP per hour (default: 100)

// ============================================================================
// Types
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitResult {
  allowed: boolean;
  reason?: 'session' | 'ip';
}

// ============================================================================
// Configuration
// ============================================================================

// Read limits from environment variables with defaults
// Note: These are read at module load time for performance
const SESSION_LIMIT = parseInt(import.meta.env.CHAT_RATE_LIMIT_SESSION || '50', 10) || 50;
const IP_HOURLY_LIMIT = parseInt(import.meta.env.CHAT_RATE_LIMIT_IP_HOURLY || '100', 10) || 100;

// Time windows
const HOUR_MS = 60 * 60 * 1000;
const SESSION_WINDOW_MS = 24 * HOUR_MS; // Sessions reset after 24 hours of inactivity

// ============================================================================
// In-Memory Storage
// ============================================================================

// Simple in-memory storage for rate limiting
// Note: This resets on server restart, which is acceptable for this use case
// For production with multiple instances, consider Redis or similar
const sessionLimits = new Map<string, RateLimitEntry>();
const ipLimits = new Map<string, RateLimitEntry>();

// ============================================================================
// Cleanup
// ============================================================================

/**
 * Removes expired entries from the rate limit maps
 * Called periodically to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();

  for (const [key, entry] of sessionLimits) {
    if (now >= entry.resetTime) {
      sessionLimits.delete(key);
    }
  }

  for (const [key, entry] of ipLimits) {
    if (now >= entry.resetTime) {
      ipLimits.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

// ============================================================================
// Rate Limiting Logic
// ============================================================================

/**
 * Checks and increments rate limit for a given key
 * @returns true if the request is allowed, false if rate limited
 */
function checkLimit(map: Map<string, RateLimitEntry>, key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = map.get(key);

  // No existing entry or expired - create new one
  if (!entry || now >= entry.resetTime) {
    map.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  // Check if under limit
  if (entry.count < limit) {
    entry.count++;
    return true;
  }

  // Rate limited
  return false;
}

/**
 * Checks rate limits for a chat request
 * @param sessionId - Unique session identifier
 * @param clientIp - Client IP address
 * @returns Result indicating if request is allowed
 */
export function checkRateLimit(sessionId: string, clientIp: string): RateLimitResult {
  // Check session limit first (more restrictive per-user)
  if (!checkLimit(sessionLimits, sessionId, SESSION_LIMIT, SESSION_WINDOW_MS)) {
    return { allowed: false, reason: 'session' };
  }

  // Check IP hourly limit
  if (!checkLimit(ipLimits, clientIp, IP_HOURLY_LIMIT, HOUR_MS)) {
    return { allowed: false, reason: 'ip' };
  }

  return { allowed: true };
}

/**
 * Returns a friendly message when rate limit is reached
 * Intentionally vague to avoid aiding circumvention attempts
 */
export function getRateLimitMessage(): string {
  return "I've reached my conversation limit for now. Please try again later, or feel free to explore the rest of the site to learn more about Rafael!";
}

// ============================================================================
// Testing Utilities (not exported in production)
// ============================================================================

// For testing purposes only - allows resetting state between tests
export const _testing = {
  resetAll(): void {
    sessionLimits.clear();
    ipLimits.clear();
  },
  getSessionLimit(): number {
    return SESSION_LIMIT;
  },
  getIpLimit(): number {
    return IP_HOURLY_LIMIT;
  },
};
