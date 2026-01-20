export interface ReadingTemplate {
    id: string;
    name: string;
    bgClass?: string; // Tailwind class
    bgImage?: string; // Texture URL
    bgGradient?: string; // CSS Gradient
    textClass: string; // Tailwind text color
    accentColor: string; // Hex for UI elements
    fontDefault?: string; // Default font family name
    category: 'clean' | 'textured' | 'dark' | 'nature' | 'retro' | 'cyber';
}

export const READING_TEMPLATES: ReadingTemplate[] = [
    // CLEAN / MINIMAL
    { id: 'clean-slate', name: 'Clean Slate', bgClass: 'bg-white', textClass: 'text-slate-900', accentColor: '#4f46e5', category: 'clean' },
    { id: 'soft-ivory', name: 'Soft Ivory', bgClass: 'bg-[#fcfaf2]', textClass: 'text-[#2d2d2d]', accentColor: '#d97706', category: 'clean' },
    { id: 'misty-grey', name: 'Misty Grey', bgClass: 'bg-slate-100', textClass: 'text-slate-800', accentColor: '#475569', category: 'clean' },
    { id: 'pale-blue', name: 'Pale Blue', bgClass: 'bg-blue-50', textClass: 'text-slate-900', accentColor: '#2563eb', category: 'clean' },
    { id: 'mint-fresh', name: 'Mint Fresh', bgClass: 'bg-emerald-50', textClass: 'text-emerald-950', accentColor: '#059669', category: 'clean' },
    { id: 'lavender-dream', name: 'Lavender', bgClass: 'bg-purple-50', textClass: 'text-purple-950', accentColor: '#7c3aed', category: 'clean' },
    { id: 'rose-petal', name: 'Rose Petal', bgClass: 'bg-rose-50', textClass: 'text-rose-950', accentColor: '#e11d48', category: 'clean' },

    // TEXTURED / PAPER
    { id: 'old-parchment', name: 'Old Parchment', bgImage: 'https://www.transparenttextures.com/patterns/aged-paper.png', bgClass: 'bg-[#f0e6d2]', textClass: 'text-[#3e2723]', accentColor: '#5d4037', category: 'textured' },
    { id: 'cream-paper', name: 'Cream Paper', bgImage: 'https://www.transparenttextures.com/patterns/cream-paper.png', bgClass: 'bg-[#fcfaf2]', textClass: 'text-[#1a1a1a]', accentColor: '#b45309', category: 'textured' },
    { id: 'rough-sketch', name: 'Rough Sketch', bgImage: 'https://www.transparenttextures.com/patterns/sketch-header.png', bgClass: 'bg-white', textClass: 'text-gray-800', accentColor: '#000000', category: 'textured' },
    { id: 'canvas-tex', name: 'Canvas', bgImage: 'https://www.transparenttextures.com/patterns/light-canvas-texture.png', bgClass: 'bg-stone-100', textClass: 'text-stone-800', accentColor: '#57534e', category: 'textured' },
    { id: 'rice-paper', name: 'Rice Paper', bgImage: 'https://www.transparenttextures.com/patterns/rice-paper.png', bgClass: 'bg-white', textClass: 'text-[#0f172a]', accentColor: '#94a3b8', category: 'textured' },

    // DARK / NIGHT
    { id: 'midnight-oil', name: 'Midnight Oil', bgClass: 'bg-slate-900', textClass: 'text-slate-300', accentColor: '#6366f1', category: 'dark' },
    { id: 'deep-space', name: 'Deep Space', bgClass: 'bg-[#0B0D17]', textClass: 'text-[#E2E8F0]', accentColor: '#38BDF8', category: 'dark' },
    { id: 'obsidian', name: 'Obsidian', bgClass: 'bg-black', textClass: 'text-stone-400', accentColor: '#78716c', category: 'dark' },
    { id: 'navy-night', name: 'Navy Night', bgClass: 'bg-[#0f172a]', textClass: 'text-blue-100', accentColor: '#60a5fa', category: 'dark' },
    { id: 'forest-dark', name: 'Dark Forest', bgClass: 'bg-[#052e16]', textClass: 'text-[#dcfce7]', accentColor: '#22c55e', category: 'dark' },
    { id: 'wine-cellar', name: 'Wine Cellar', bgClass: 'bg-[#4a0404]', textClass: 'text-[#ffe4e6]', accentColor: '#fb7185', category: 'dark' },

    // RETRO / TYPEWRITER
    { id: '1984', name: '1984', bgClass: 'bg-[#dadad3]', textClass: 'text-[#2b2b2b]', accentColor: '#ff0000', fontDefault: 'Courier Prime', category: 'retro' },
    { id: 'blueprint', name: 'Blueprint', bgClass: 'bg-[#1e3a8a]', textClass: 'text-white', accentColor: '#93c5fd', category: 'retro' },
    { id: 'sepia-tone', name: 'Sepia Tone', bgClass: 'bg-[#704214]', textClass: 'text-[#fef3c7]', accentColor: '#d97706', category: 'retro' },
    { id: 'newsprint', name: 'Newsprint', bgImage: 'https://www.transparenttextures.com/patterns/groovepaper.png', bgClass: 'bg-[#f3f4f6]', textClass: 'text-[#111827]', accentColor: '#374151', category: 'retro' },

    // CYBERPUNK / SCIFI
    { id: 'neon-city', name: 'Neon City', bgClass: 'bg-[#11001c]', textClass: 'text-[#d946ef]', accentColor: '#22d3ee', category: 'cyber' },
    { id: 'matrix', name: 'The Matrix', bgClass: 'bg-black', textClass: 'text-[#00ff41]', accentColor: '#008f11', fontDefault: 'Fira Code', category: 'cyber' },
    { id: 'hacker-term', name: 'Terminal', bgClass: 'bg-[#0c0c0c]', textClass: 'text-[#33ff00]', accentColor: '#33ff00', category: 'cyber' },
    { id: 'solar-flare', name: 'Solar Flare', bgClass: 'bg-[#2a0a0a]', textClass: 'text-[#fca5a5]', accentColor: '#f87171', category: 'cyber' },
    { id: 'synthwave', name: 'Synthwave', bgGradient: 'linear-gradient(to bottom, #2d1b4e, #1a1a2e)', textClass: 'text-[#ff71ce]', accentColor: '#01cdfe', category: 'cyber' },

    // NATURE / ORGANIC
    { id: 'amazon', name: 'Amazon', bgClass: 'bg-[#ecfccb]', textClass: 'text-[#14532d]', accentColor: '#166534', category: 'nature' },
    { id: 'ocean-breeze', name: 'Ocean Breeze', bgClass: 'bg-[#ecfeff]', textClass: 'text-[#0e7490]', accentColor: '#06b6d4', category: 'nature' },
    { id: 'sunset', name: 'Sunset', bgGradient: 'linear-gradient(to bottom, #fff7ed, #ffedd5)', textClass: 'text-[#7c2d12]', accentColor: '#ea580c', category: 'nature' },
    { id: 'desert-sand', name: 'Desert Sand', bgClass: 'bg-[#f5f5f4]', textClass: 'text-[#57534e]', accentColor: '#d6d3d1', category: 'nature' },
    { id: 'cherry-blossom', name: 'Sakura', bgClass: 'bg-[#fff1f2]', textClass: 'text-[#881337]', accentColor: '#e11d48', category: 'nature' },
    { id: 'stormy-sky', name: 'Stormy Sky', bgClass: 'bg-[#475569]', textClass: 'text-[#f1f5f9]', accentColor: '#94a3b8', category: 'nature' },

    // HIGH CONTRAST (Accessibility)
    { id: 'high-contrast-bw', name: 'High Contrast B/W', bgClass: 'bg-white', textClass: 'text-black', accentColor: '#000000', category: 'clean' },
    { id: 'high-contrast-wb', name: 'High Contrast W/B', bgClass: 'bg-black', textClass: 'text-white', accentColor: '#ffffff', category: 'dark' },
    { id: 'yellow-on-black', name: 'Yellow on Black', bgClass: 'bg-black', textClass: 'text-yellow-400', accentColor: '#facc15', category: 'dark' },
];
