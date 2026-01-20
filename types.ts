
export type View = 'home' | 'create' | 'novel' | 'writer' | 'shelf';

export interface Character {
  id: string;
  name: string;
  role: string;
  archetype: string;
  description: string;
  personality: string;
  motivation: string;
  notes?: string;
}

export interface OutlineItem {
  chapterNumber: number;
  title: string;
  summary: string;
  keyEvents: string[];
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  content: string;
  status: 'draft' | 'completed' | 'archived';
  aiPrompt?: string;
  lastEdited?: number;
  wordCount?: number;
}

export interface Reference {
  id: string;
  name: string;
  content: string;
  addedAt: number;
}

export interface Novel {
  id: string;
  title: string;
  genre: string;
  subGenres: string[];
  premise: string;
  lorebook: string[];
  referenceIds: string[];
  characters: Character[];
  outline: OutlineItem[];
  chapters: (Chapter | null)[];
  createdAt: number;
  updatedAt?: number;
  status?: 'planning' | 'writing' | 'completed';
}
