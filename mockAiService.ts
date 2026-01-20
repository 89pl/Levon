
import { Character, OutlineItem, Novel } from "./types";

export const mockGenerateOutline = async (novelInfo: { title: string; genre: string; subGenres: string[]; premise: string }): Promise<{ outline: OutlineItem[]; characters: Character[]; lorebook: string[]; referenceIds: string[] }> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

    return {
        characters: [
            {
                id: "1",
                name: "Elias Vance",
                role: "Protagonist",
                archetype: "The Reluctant Hero",
                description: "A former technician who wants nothing but peace, but is pulled into a conspiracy.",
                personality: "Quiet, methodical, and fiercely loyal once earned.",
                motivation: "To protect his sister from the corporate shadow-state."
            },
            {
                id: "2",
                name: "Director Kael",
                role: "Antagonist",
                archetype: "The Architect",
                description: "The visionary leader of the Apex Corp, believing control is the only path to safety.",
                personality: "Coldly rational, charming when necessary, and utterly ruthless.",
                motivation: "To achieve ultimate stability through total information dominance."
            }
        ],
        outline: Array.from({ length: 12 }, (_, i) => ({
            chapterNumber: i + 1,
            title: `[TBD] Chapter ${i + 1}`,
            summary: `In this chapter, the story of ${novelInfo.title} unfolds further into the themes of ${novelInfo.genre}. ${novelInfo.premise.slice(0, 50)}...`,
            keyEvents: ["A critical discovery is made", "Conflict arises between key figures", "The stakes are raised significantly"]
        })),
        lorebook: [],
        referenceIds: []
    };
};

export const mockGenerateChapterContent = async (
    title: string,
    chapterIndex: number
): Promise<{ title: string; content: string }> => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay

    return {
        title: `Whispers of Chapter ${chapterIndex + 1}`,
        content: `[1200-1400 Word Generation Simulation]\n\nThis is a deep, immersive mock chapter content for Chapter ${chapterIndex + 1} of "${title}".\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. [Repeating for volume to simulate target length...]\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nOver the course of this chapter, the characters face many challenges and grow as individuals. The world they inhabit is described with rich detail and the dialogue flows naturally between them. The stakes are finally established and the reader is pulled deeper into the mystery.`
    };
};

export const mockSummarizeChapterForLorebook = async (novel: Novel, content: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        `Key event from Chapter ${novel.chapters.length + 1} occurred.`,
        `A revelation regarding the ${novel.genre} theme was made.`
    ];
};
