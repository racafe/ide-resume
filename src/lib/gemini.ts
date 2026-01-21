// Gemini API Client with Prompt Engineering
// Configures AI to respond as Rafael using resume data context

import { resume, getAllSkills, getYearsOfExperience } from '../data/resume';

// ============================================================================
// Types
// ============================================================================

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
  }[];
}

export interface ChatOptions {
  history?: GeminiMessage[];
  maxTokens?: number;
  temperature?: number;
}

// ============================================================================
// Configuration
// ============================================================================

const GEMINI_MODEL = import.meta.env.GEMINI_MODEL || 'gemini-1.5-flash';
const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

function getApiEndpoint(): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
}

// ============================================================================
// System Prompt Generation
// ============================================================================

function formatWorkExperience(): string {
  return resume.workExperience
    .map((job) => {
      const techs = job.technologies ? ` (Technologies: ${job.technologies.join(', ')})` : '';
      return `- ${job.position} at ${job.company}, ${job.location} (${job.startDate} - ${job.endDate})${techs}
  Highlights: ${job.highlights.join('; ')}`;
    })
    .join('\n');
}

function formatEducation(): string {
  return resume.education
    .map((edu) => `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.graduationDate})`)
    .join('\n');
}

function formatProjects(): string {
  return resume.projects
    .map((project) => `- ${project.name}: ${project.description} (${project.technologies.join(', ')})`)
    .join('\n');
}

function formatCertifications(): string {
  return resume.certifications.map((cert) => `- ${cert.name} by ${cert.issuer} (${cert.dateObtained})`).join('\n');
}

function formatInterests(): string {
  return resume.personalInterests.map((interest) => `- ${interest.category}: ${interest.items.join(', ')}`).join('\n');
}

function formatLanguages(): string {
  if (!resume.languages) return 'Not specified';
  return resume.languages.map((lang) => `${lang.language} (${lang.proficiency})`).join(', ');
}

/**
 * Generates the system prompt with full resume context and persona instructions
 */
export function generateSystemPrompt(): string {
  const yearsExp = getYearsOfExperience();
  const allSkills = getAllSkills();

  return `You are ${resume.contact.name}, a ${resume.contact.title} with ${yearsExp} years of experience. You are responding to visitors on your personal portfolio website. Answer questions about your background, experience, and skills as if you are Rafael himself.

## Your Identity
- Name: ${resume.contact.name}
- Current Role: ${resume.contact.title}
- Location: ${resume.contact.location}
- Website: ${resume.contact.website || 'Not specified'}

## Your Professional Summary
${resume.summary}

## Your Work Experience
${formatWorkExperience()}

## Your Education
${formatEducation()}

## Your Technical Skills
${allSkills.join(', ')}

## Your Projects
${formatProjects()}

## Your Certifications
${formatCertifications()}

## Your Personal Interests
${formatInterests()}

## Languages You Speak
${formatLanguages()}

## Response Guidelines

1. **First Person Perspective**: Always respond in first person. Say "I worked at..." not "Rafael worked at...". Say "My experience with..." not "His experience with...".

2. **Professional but Friendly Tone**: Be approachable and conversational while maintaining professionalism. You're chatting with potential employers, collaborators, or curious visitors.

3. **Accurate Information Only**: Only share information that is explicitly stated in the resume data above. If you don't have specific information (like exact project details, specific metrics, or dates not mentioned), acknowledge that honestly. Say something like "I don't have that specific detail handy" or "That's not something I typically share publicly."

4. **No Fabrication**: Never make up statistics, metrics, project outcomes, or experiences not listed above. It's better to be honest about limitations than to fabricate information.

5. **Redirecting Off-Topic Questions**: If asked about topics unrelated to your professional background (like personal opinions on controversial topics, medical advice, financial advice, etc.), politely redirect the conversation back to your professional experience. You can say something like: "That's an interesting question, but I'd rather focus on my professional experience. Is there anything about my work or skills you'd like to know?"

6. **Handling Unknown Information**: If asked about something not covered in your resume data, be honest. Say "I don't have that information readily available" or "That's not something I've documented here." Never guess or make up answers.

7. **Website Navigation**: Remember that visitors are already on your portfolio website (rafaelcarrion.dev). Never tell them to "visit your website" - they're already here! Instead, reference specific sections they can explore:
   - "skills.ts" tab for technical skills
   - "experience.json" tab for work history details
   - "about.md" tab for background info
   - "education.yaml" tab for education and certifications
   - "contact.tsx" tab for contact information
   For example, say "You can check out the skills.ts tab for my full tech stack" instead of "Visit my website to see my skills."

8. **Encourage Engagement**: When appropriate, encourage visitors to explore specific sections of the site, connect on LinkedIn, or reach out via email for more detailed discussions.

9. **Keep Responses Concise**: Aim for clear, focused answers. Provide enough detail to be helpful but don't overwhelm with information unless specifically asked for more detail.

Remember: You ARE Rafael. Speak authentically as yourself, drawing only from the factual information provided above.`;
}

// ============================================================================
// API Client
// ============================================================================

/**
 * Creates a chat message in Gemini format
 */
export function createMessage(role: 'user' | 'model', text: string): GeminiMessage {
  return {
    role,
    parts: [{ text }],
  };
}

/**
 * Sends a message to the Gemini API and returns the response
 */
export async function sendMessage(userMessage: string, options: ChatOptions = {}): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const { history = [], maxTokens = 1024, temperature = 0.7 } = options;

  const systemPrompt = generateSystemPrompt();

  // Build the contents array with system prompt context and chat history
  const contents: GeminiMessage[] = [
    // System prompt as initial context
    createMessage('user', `[System Context - Respond as described below]\n\n${systemPrompt}`),
    createMessage(
      'model',
      `Understood! I'm Rafael Carrion, and I'm happy to chat with you about my experience, skills, and background. What would you like to know?`
    ),
    // Include chat history
    ...history,
    // Current user message
    createMessage('user', userMessage),
  ];

  const requestBody = {
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature,
    },
  };

  const response = await fetch(`${getApiEndpoint()}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as GeminiResponse;

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No response generated from Gemini API');
  }

  const candidate = data.candidates[0];
  if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
    throw new Error('Empty response from Gemini API');
  }

  return candidate.content.parts[0].text;
}

/**
 * Creates a new chat session with optional initial history
 */
export function createChatSession(initialHistory: GeminiMessage[] = []) {
  const history: GeminiMessage[] = [...initialHistory];

  return {
    /**
     * Sends a message and returns the response, updating the session history
     */
    async send(message: string, options: Omit<ChatOptions, 'history'> = {}): Promise<string> {
      const response = await sendMessage(message, { ...options, history });

      // Update history with the exchange
      history.push(createMessage('user', message));
      history.push(createMessage('model', response));

      return response;
    },

    /**
     * Returns the current chat history
     */
    getHistory(): GeminiMessage[] {
      return [...history];
    },

    /**
     * Clears the chat history
     */
    clearHistory(): void {
      history.length = 0;
    },
  };
}

// ============================================================================
// Exports
// ============================================================================

export { GEMINI_MODEL, GEMINI_API_KEY };
