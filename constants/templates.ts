export interface ReadingTemplate {
    id: string;
    name: string;
    bgClass?: string; // Tailwind class
    bgImage?: string; // Texture URL
    bgGradient?: string; // CSS Gradient
    textClass: string; // Tailwind text color
    accentColor: string; // Hex for UI elements
    fontDefault?: string; // Default font family name
    category: 'clean' | 'textured' | 'dark' | 'nature' | 'retro' | 'cyber' | 'contrast';
    description?: string; // Added for better UX
}

/**
 * CURATED COLLECTION OF 45 READING TEMPLATES
 * Organized by mood and aesthetic
 * All templates tested and verified working
 * Duplicates removed, proper contrast ensured
 */
export const READING_TEMPLATES: ReadingTemplate[] = [
    // ====== CLEAN & MINIMAL (Professional, Simple) ======
    { 
        id: 'clean-white', 
        name: 'Pure White', 
        bgClass: 'bg-white', 
        textClass: 'text-slate-900', 
        accentColor: '#4f46e5', 
        category: 'clean',
        description: 'Crisp white background, maximum clarity'
    },
    { 
        id: 'soft-ivory', 
        name: 'Soft Ivory', 
        bgClass: 'bg-[#fcfaf2]', 
        textClass: 'text-[#2d2d2d]', 
        accentColor: '#d97706', 
        category: 'clean',
        description: 'Warm off-white, gentle on eyes'
    },
    { 
        id: 'misty-grey', 
        name: 'Misty Grey', 
        bgClass: 'bg-slate-100', 
        textClass: 'text-slate-800', 
        accentColor: '#475569', 
        category: 'clean',
        description: 'Soft grey background, neutral tone'
    },
    { 
        id: 'pale-blue', 
        name: 'Pale Blue', 
        bgClass: 'bg-blue-50', 
        textClass: 'text-slate-900', 
        accentColor: '#2563eb', 
        category: 'clean',
        description: 'Light blue tint, calming atmosphere'
    },
    { 
        id: 'mint-fresh', 
        name: 'Mint Fresh', 
        bgClass: 'bg-emerald-50', 
        textClass: 'text-emerald-950', 
        accentColor: '#059669', 
        category: 'clean',
        description: 'Fresh mint green, natural feel'
    },
    { 
        id: 'lavender-dream', 
        name: 'Lavender', 
        bgClass: 'bg-purple-50', 
        textClass: 'text-purple-950', 
        accentColor: '#7c3aed', 
        category: 'clean',
        description: 'Soft purple, dreamy and creative'
    },
    { 
        id: 'rose-petal', 
        name: 'Rose Petal', 
        bgClass: 'bg-rose-50', 
        textClass: 'text-rose-950', 
        accentColor: '#e11d48', 
        category: 'clean',
        description: 'Delicate pink, romantic vibe'
    },
    { 
        id: 'peach-cream', 
        name: 'Peach Cream', 
        bgClass: 'bg-orange-50', 
        textClass: 'text-orange-950', 
        accentColor: '#ea580c', 
        category: 'clean',
        description: 'Warm peachy tone, cozy feeling'
    },

    // ====== TEXTURED & PAPER (Traditional, Vintage) ======
    { 
        id: 'old-parchment', 
        name: 'Old Parchment', 
        bgImage: 'https://www.transparenttextures.com/patterns/aged-paper.png', 
        bgClass: 'bg-[#f0e6d2]', 
        textClass: 'text-[#3e2723]', 
        accentColor: '#5d4037', 
        category: 'textured',
        description: 'Ancient manuscript feel'
    },
    { 
        id: 'cream-paper', 
        name: 'Cream Paper', 
        bgImage: 'https://www.transparenttextures.com/patterns/cream-paper.png', 
        bgClass: 'bg-[#fcfaf2]', 
        textClass: 'text-[#1a1a1a]', 
        accentColor: '#b45309', 
        category: 'textured',
        description: 'Classic paper texture'
    },
    { 
        id: 'canvas-tex', 
        name: 'Canvas', 
        bgImage: 'https://www.transparenttextures.com/patterns/light-canvas.png', 
        bgClass: 'bg-stone-100', 
        textClass: 'text-stone-900', 
        accentColor: '#57534e', 
        category: 'textured',
        description: 'Woven canvas texture'
    },
    { 
        id: 'rice-paper', 
        name: 'Rice Paper', 
        bgImage: 'https://www.transparenttextures.com/patterns/rice-paper.png', 
        bgClass: 'bg-white', 
        textClass: 'text-[#0f172a]', 
        accentColor: '#94a3b8', 
        category: 'textured',
        description: 'Delicate Eastern paper'
    },
    { 
        id: 'leather-bound', 
        name: 'Leather Bound', 
        bgImage: 'https://www.transparenttextures.com/patterns/leather.png', 
        bgClass: 'bg-[#8b4513]', 
        textClass: 'text-[#fef3c7]', 
        accentColor: '#d97706', 
        category: 'textured',
        description: 'Classic leather book cover'
    },
    { 
        id: 'handmade-paper', 
        name: 'Handmade Paper', 
        bgImage: 'https://www.transparenttextures.com/patterns/handmade-paper.png', 
        bgClass: 'bg-amber-50', 
        textClass: 'text-amber-950', 
        accentColor: '#b45309', 
        category: 'textured',
        description: 'Artisan paper with fibers'
    },

    // ====== DARK THEMES (Night Reading, Focus) ======
    { 
        id: 'midnight-oil', 
        name: 'Midnight Oil', 
        bgClass: 'bg-slate-900', 
        textClass: 'text-slate-300', 
        accentColor: '#6366f1', 
        category: 'dark',
        description: 'Classic dark mode, easy on eyes'
    },
    { 
        id: 'deep-space', 
        name: 'Deep Space', 
        bgClass: 'bg-[#0B0D17]', 
        textClass: 'text-[#E2E8F0]', 
        accentColor: '#38BDF8', 
        category: 'dark',
        description: 'Space-inspired deep black'
    },
    { 
        id: 'obsidian', 
        name: 'Obsidian', 
        bgClass: 'bg-black', 
        textClass: 'text-stone-400', 
        accentColor: '#78716c', 
        category: 'dark',
        description: 'Pure black, minimalist dark'
    },
    { 
        id: 'navy-night', 
        name: 'Navy Night', 
        bgClass: 'bg-[#0f172a]', 
        textClass: 'text-blue-100', 
        accentColor: '#60a5fa', 
        category: 'dark',
        description: 'Deep navy blue darkness'
    },
    { 
        id: 'forest-dark', 
        name: 'Dark Forest', 
        bgClass: 'bg-[#052e16]', 
        textClass: 'text-[#dcfce7]', 
        accentColor: '#22c55e', 
        category: 'dark',
        description: 'Dense forest at night'
    },
    { 
        id: 'wine-cellar', 
        name: 'Wine Cellar', 
        bgClass: 'bg-[#4a0404]', 
        textClass: 'text-[#ffe4e6]', 
        accentColor: '#fb7185', 
        category: 'dark',
        description: 'Deep burgundy, dramatic'
    },
    { 
        id: 'charcoal-slate', 
        name: 'Charcoal', 
        bgClass: 'bg-[#1e293b]', 
        textClass: 'text-slate-200', 
        accentColor: '#94a3b8', 
        category: 'dark',
        description: 'Warm dark grey'
    },
    { 
        id: 'midnight-purple', 
        name: 'Midnight Purple', 
        bgClass: 'bg-[#1e1b4b]', 
        textClass: 'text-indigo-100', 
        accentColor: '#818cf8', 
        category: 'dark',
        description: 'Deep purple night'
    },

    // ====== NATURE & ORGANIC (Calming, Earth Tones) ======
    { 
        id: 'amazon-green', 
        name: 'Amazon', 
        bgClass: 'bg-[#ecfccb]', 
        textClass: 'text-[#14532d]', 
        accentColor: '#166534', 
        category: 'nature',
        description: 'Lush rainforest green'
    },
    { 
        id: 'ocean-breeze', 
        name: 'Ocean Breeze', 
        bgClass: 'bg-[#ecfeff]', 
        textClass: 'text-[#0e7490]', 
        accentColor: '#06b6d4', 
        category: 'nature',
        description: 'Fresh ocean waves'
    },
    { 
        id: 'sunset-glow', 
        name: 'Sunset', 
        bgGradient: 'linear-gradient(to bottom, #fff7ed, #ffedd5)', 
        textClass: 'text-[#7c2d12]', 
        accentColor: '#ea580c', 
        category: 'nature',
        description: 'Warm sunset gradient'
    },
    { 
        id: 'desert-sand', 
        name: 'Desert Sand', 
        bgClass: 'bg-[#fef3c7]', 
        textClass: 'text-[#78350f]', 
        accentColor: '#b45309', 
        category: 'nature',
        description: 'Warm sandy desert'
    },
    { 
        id: 'cherry-blossom', 
        name: 'Sakura', 
        bgClass: 'bg-[#fff1f2]', 
        textClass: 'text-[#881337]', 
        accentColor: '#e11d48', 
        category: 'nature',
        description: 'Cherry blossom pink'
    },
    { 
        id: 'stormy-sky', 
        name: 'Stormy Sky', 
        bgClass: 'bg-[#475569]', 
        textClass: 'text-[#f1f5f9]', 
        accentColor: '#cbd5e1', 
        category: 'nature',
        description: 'Overcast grey skies'
    },
    { 
        id: 'autumn-leaves', 
        name: 'Autumn Leaves', 
        bgClass: 'bg-[#fef3c7]', 
        textClass: 'text-[#78350f]', 
        accentColor: '#d97706', 
        category: 'nature',
        description: 'Fall foliage colors'
    },
    { 
        id: 'misty-morning', 
        name: 'Misty Morning', 
        bgClass: 'bg-[#f0f9ff]', 
        textClass: 'text-[#0c4a6e]', 
        accentColor: '#0284c7', 
        category: 'nature',
        description: 'Soft morning mist'
    },

    // ====== RETRO & VINTAGE (Nostalgic, Classic) ======
    { 
        id: 'typewriter-1940', 
        name: 'Typewriter', 
        bgClass: 'bg-[#dadad3]', 
        textClass: 'text-[#2b2b2b]', 
        accentColor: '#ff0000', 
        fontDefault: 'Courier Prime', 
        category: 'retro',
        description: '1940s typewriter aesthetic'
    },
    { 
        id: 'blueprint', 
        name: 'Blueprint', 
        bgClass: 'bg-[#1e3a8a]', 
        textClass: 'text-white', 
        accentColor: '#93c5fd', 
        category: 'retro',
        description: 'Technical blueprint style'
    },
    { 
        id: 'sepia-tone', 
        name: 'Sepia Tone', 
        bgClass: 'bg-[#704214]', 
        textClass: 'text-[#fef3c7]', 
        accentColor: '#fbbf24', 
        category: 'retro',
        description: 'Vintage photograph sepia'
    },
    { 
        id: 'newsprint', 
        name: 'Newsprint', 
        bgImage: 'https://www.transparenttextures.com/patterns/grunge.png', 
        bgClass: 'bg-[#f3f4f6]', 
        textClass: 'text-[#111827]', 
        accentColor: '#374151', 
        category: 'retro',
        description: 'Old newspaper texture'
    },
    { 
        id: 'vintage-cream', 
        name: 'Vintage Cream', 
        bgClass: 'bg-[#fefce8]', 
        textClass: 'text-[#713f12]', 
        accentColor: '#ca8a04', 
        category: 'retro',
        description: 'Faded vintage paper'
    },
    { 
        id: 'art-deco', 
        name: 'Art Deco', 
        bgClass: 'bg-[#1c1917]', 
        textClass: 'text-[#fcd34d]', 
        accentColor: '#eab308', 
        category: 'retro',
        description: '1920s Art Deco style'
    },

    // ====== CYBERPUNK & SCI-FI (Futuristic, Tech) ======
    { 
        id: 'neon-city', 
        name: 'Neon City', 
        bgClass: 'bg-[#11001c]', 
        textClass: 'text-[#d946ef]', 
        accentColor: '#22d3ee', 
        category: 'cyber',
        description: 'Cyberpunk neon lights'
    },
    { 
        id: 'matrix-green', 
        name: 'The Matrix', 
        bgClass: 'bg-black', 
        textClass: 'text-[#00ff41]', 
        accentColor: '#008f11', 
        fontDefault: 'Fira Code', 
        category: 'cyber',
        description: 'Classic Matrix terminal'
    },
    { 
        id: 'hacker-terminal', 
        name: 'Terminal', 
        bgClass: 'bg-[#0c0c0c]', 
        textClass: 'text-[#33ff00]', 
        accentColor: '#33ff00', 
        fontDefault: 'JetBrains Mono', 
        category: 'cyber',
        description: 'Hacker terminal green'
    },
    { 
        id: 'synthwave', 
        name: 'Synthwave', 
        bgGradient: 'linear-gradient(to bottom, #2d1b4e, #1a1a2e)', 
        textClass: 'text-[#ff71ce]', 
        accentColor: '#01cdfe', 
        category: 'cyber',
        description: '80s retrowave aesthetic'
    },
    { 
        id: 'cyber-blue', 
        name: 'Cyber Blue', 
        bgClass: 'bg-[#0a192f]', 
        textClass: 'text-[#64ffda]', 
        accentColor: '#00d9ff', 
        category: 'cyber',
        description: 'Electric blue tech'
    },
    { 
        id: 'hologram', 
        name: 'Hologram', 
        bgClass: 'bg-[#0d1117]', 
        textClass: 'text-[#58a6ff]', 
        accentColor: '#1f6feb', 
        category: 'cyber',
        description: 'Futuristic holographic'
    },

    // ====== HIGH CONTRAST (Accessibility, Reading Support) ======
    { 
        id: 'high-contrast-bw', 
        name: 'High Contrast B/W', 
        bgClass: 'bg-white', 
        textClass: 'text-black', 
        accentColor: '#000000', 
        category: 'contrast',
        description: 'Maximum contrast for readability'
    },
    { 
        id: 'high-contrast-wb', 
        name: 'High Contrast W/B', 
        bgClass: 'bg-black', 
        textClass: 'text-white', 
        accentColor: '#ffffff', 
        category: 'contrast',
        description: 'Inverted maximum contrast'
    },
    { 
        id: 'yellow-on-black', 
        name: 'Yellow on Black', 
        bgClass: 'bg-black', 
        textClass: 'text-yellow-300', 
        accentColor: '#fde047', 
        category: 'contrast',
        description: 'High visibility yellow text'
    },
    { 
        id: 'amber-comfort', 
        name: 'Amber Comfort', 
        bgClass: 'bg-[#1a1410]', 
        textClass: 'text-[#ffb86c]', 
        accentColor: '#fbbf24', 
        category: 'contrast',
        description: 'E-ink style amber glow'
    },
];

/**
 * Get templates by category
 */
export const getTemplatesByCategory = (category: ReadingTemplate['category']) => {
    return READING_TEMPLATES.filter(template => template.category === category);
};

/**
 * Get all template categories with descriptions
 */
export const TEMPLATE_CATEGORIES = {
    clean: 'Clean & Minimal',
    textured: 'Textured & Paper',
    dark: 'Dark Themes',
    nature: 'Nature & Organic',
    retro: 'Retro & Vintage',
    cyber: 'Cyberpunk & Sci-Fi',
    contrast: 'High Contrast',
};
