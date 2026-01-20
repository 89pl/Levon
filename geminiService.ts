
import { GoogleGenAI, Type } from "@google/genai";
import { Novel, Character, OutlineItem } from "./types";
import { mockGenerateOutline, mockGenerateChapterContent, mockSummarizeChapterForLorebook } from "./mockAiService";

const API_KEY = process.env.API_KEY || '';
const IS_MOCK = !API_KEY || API_KEY === 'PLACEHOLDER_API_KEY';

const getAI = () => new GoogleGenAI({ apiKey: API_KEY });

export const generateOutline = async (novelInfo: { title: string; genre: string; subGenres: string[]; premise: string }): Promise<{ outline: OutlineItem[]; characters: Character[]; lorebook: string[]; referenceIds: string[] }> => {
  if (IS_MOCK) return { ...await mockGenerateOutline(novelInfo), lorebook: [], referenceIds: [] };

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Act as a world-class literary architect. Create a structured outline for a novel titled "${novelInfo.title}" in the ${novelInfo.genre} genre ${novelInfo.subGenres.length > 0 ? `with themes of ${novelInfo.subGenres.join(', ')}` : ''}.
      Premise: ${novelInfo.premise}.
      Provide a list of 4-6 main characters and an outline of at least 8 chapters.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            characters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  archetype: { type: Type.STRING },
                  description: { type: Type.STRING },
                  personality: { type: Type.STRING },
                  motivation: { type: Type.STRING }
                },
                required: ["id", "name", "role", "archetype", "description", "personality", "motivation"]
              }
            },
            outline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  chapterNumber: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  keyEvents: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["chapterNumber", "title", "summary", "keyEvents"]
              }
            }
          },
          required: ["characters", "outline"]
        }
      }
    });

    // Validate response before parsing
    if (!response.text) {
      throw new Error("Empty response from AI service");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating outline:", error);
    throw error;
  }
};

export const generateChapterContent = async (
  novel: Novel,
  chapterIndex: number,
  specificInstructions?: string,
  referenceContext?: string
): Promise<{ title: string; content: string }> => {
  if (IS_MOCK) return mockGenerateChapterContent(novel.title, chapterIndex);

  const ai = getAI();
  const currentChapter = novel.outline[chapterIndex];
  const previousChaptersSummary = novel.chapters
    .slice(0, chapterIndex)
    .filter(c => c !== null)
    .map(c => `Chapter ${c!.chapterNumber}: ${c!.title}. Summary: ${novel.outline[c!.chapterNumber - 1].summary}`)
    .join('\n');

  const characterProfiles = novel.characters
    .map(char => `${char.name} (${char.role}): ${char.description}. Personality: ${char.personality}`)
    .join('\n');

  const lorebookContext = novel.lorebook?.length > 0
    ? `\nKey World/Plot Facts (Lorebook):\n${novel.lorebook.map(f => `- ${f}`).join('\n')}`
    : '';

  const styleReference = referenceContext
    ? `\nStyle Reference (Incorporate this literary style/tone):\n${referenceContext.slice(0, 3000)}`
    : '';

  const prompt = `Act as a master novelist. Write Chapter ${currentChapter.chapterNumber} of the novel "${novel.title}".
  
Genre: ${novel.genre} ${novel.subGenres.length > 0 ? `(Themes: ${novel.subGenres.join(', ')})` : ''}
Current Chapter Title: ${currentChapter.title}
Chapter Context: ${currentChapter.summary}
Key Events to include: ${currentChapter.keyEvents.join(', ')}

Character Profiles:
${characterProfiles}
${lorebookContext}
${styleReference}

Previous Story Progress:
${previousChaptersSummary}

Instruction for this chapter: ${specificInstructions || "Write in an engaging, immersive literary style. Use rich descriptions and dynamic dialogue."}

Write the full chapter content. Aim for a substantial, literary length of **1200-1400 words**.

Return the result in JSON format:
{
  "title": "A compelling, creative title for this specific chapter",
  "content": "The full chapter text here..."
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp', // Using a stable model name or whatever was there
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["title", "content"]
      },
      temperature: 0.8
    }
  });

  const res = JSON.parse(response.text);
  return res || { title: currentChapter.title, content: "Failed to generate." };
};

export const summarizeChapterForLorebook = async (novel: Novel, chapterContent: string): Promise<string[]> => {
  if (IS_MOCK) return mockSummarizeChapterForLorebook(novel, chapterContent);

  const ai = getAI();
  const prompt = `Act as a literary editor. Analyze the following chapter from the novel "${novel.title}".
  Extract 2-4 strictly new/updated key facts about the world, plot, or character status that MUST be remembered for future chapters.
  Format each fact as a single concise sentence.
  
  Chapter Content:
  ${chapterContent.slice(-4000)}
  
  Return result in JSON format:
  { "facts": ["Fact 1", "Fact 2"] }`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: { facts: { type: Type.ARRAY, items: { type: Type.STRING } } },
        required: ["facts"]
      }
    }
  });

  try {
    const res = JSON.parse(response.text);
    return res.facts || [];
  } catch (e) {
    return [];
  }
};
