// Wraps Google Gen AI SDK calls for the AI note summariser feature.

const { GoogleGenAI } = require('@google/genai');

// Lazily initialise the client — throws only if actually used without a key
let ai = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  if (!ai) {
    // The SDK reads GEMINI_API_KEY from env automatically if no apiKey is passed,
    // but we pass it explicitly so the error is clear when it's missing.
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

/**
 * Summarises a list of lead notes using Gemma 4.
 *
 * @param {object} params
 * @param {string} params.leadName    - Full name of the lead
 * @param {string} params.companyName - Lead's company
 * @param {string} params.leadStatus  - Current pipeline stage
 * @param {Array<{content: string, created_by_name: string, created_at: string}>} params.notes
 * @returns {Promise<string>} Formatted AI summary text
 */
async function summariseLeadNotes({ leadName, companyName, leadStatus, notes }) {
  const client = getClient();

  // Format each note into a readable string for the prompt
  const notesText = notes
    .map((note, index) => {
      const date = new Date(note.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
      const author = note.created_by_name || 'Team Member';
      return `[Note ${index + 1} — ${date} by ${author}]\n${note.content}`;
    })
    .join('\n\n');

  const prompt = `You are an expert CRM sales assistant. A salesperson needs a quick briefing on a lead before their next call.

LEAD DETAILS:
- Name: ${leadName}
- Company: ${companyName}
- Current Pipeline Stage: ${leadStatus}

NOTES FROM THE SALES TEAM:
${notesText}

Based only on the notes above, provide a structured short briefing using EXACTLY this format:

**Overall Status**
One sentence on where this deal stands right now.

**Customer Sentiment**
Positive / Neutral / Negative — one sentence explaining why.

**Suggested Next Action**
One specific, concrete action the salesperson should take next.

Rules:
- Be concise and professional
- Do not invent any facts not mentioned in the notes
- If there are very few notes, keep the summary short`;

  const response = await client.models.generateContent({
    model: 'gemma-4-31b-it',
    contents: prompt,
  });

  return response.text;
}

module.exports = { summariseLeadNotes };
