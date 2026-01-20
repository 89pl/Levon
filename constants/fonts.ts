export interface FontConfig {
    name: string;
    family: string;
    category: 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting';
    urlParam: string; // The part after family= in Google Fonts URL
    description?: string; // Added for better UX
}

/**
 * CURATED COLLECTION OF 50+ GOOGLE FONTS
 * Researched and tested for readability, aesthetics, and literary use
 * All fonts verified working and deduplicated
 * Optimized for novel writing and reading experiences
 */
export const SUPPORTED_FONTS: FontConfig[] = [
    // === SERIF FONTS (Classic Book & Literature) ===
    { 
        name: "Lora", 
        family: "'Lora', serif", 
        category: "serif", 
        urlParam: "Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700",
        description: "Classic book serif with excellent readability"
    },
    { 
        name: "Merriweather", 
        family: "'Merriweather', serif", 
        category: "serif", 
        urlParam: "Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900",
        description: "Designed for screen reading, warm and friendly"
    },
    { 
        name: "Playfair Display", 
        family: "'Playfair Display', serif", 
        category: "serif", 
        urlParam: "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Elegant high-contrast serif for titles and drama"
    },
    { 
        name: "EB Garamond", 
        family: "'EB Garamond', serif", 
        category: "serif", 
        urlParam: "EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800",
        description: "Traditional old-style serif, scholarly feel"
    },
    { 
        name: "Crimson Text", 
        family: "'Crimson Text', serif", 
        category: "serif", 
        urlParam: "Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700",
        description: "Inspired by classic old-face designs"
    },
    { 
        name: "Libre Baskerville", 
        family: "'Libre Baskerville', serif", 
        category: "serif", 
        urlParam: "Libre+Baskerville:ital,wght@0,400;0,700;1,400",
        description: "Web-optimized Baskerville, timeless elegance"
    },
    { 
        name: "PT Serif", 
        family: "'PT Serif', serif", 
        category: "serif", 
        urlParam: "PT+Serif:ital,wght@0,400;0,700;1,400;1,700",
        description: "Contemporary serif with Russian heritage"
    },
    { 
        name: "Bitter", 
        family: "'Bitter', serif", 
        category: "serif", 
        urlParam: "Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Contemporary slab serif for long-form text"
    },
    { 
        name: "Vollkorn", 
        family: "'Vollkorn', serif", 
        category: "serif", 
        urlParam: "Vollkorn:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Book serif with quiet elegance"
    },
    { 
        name: "Alegreya", 
        family: "'Alegreya', serif", 
        category: "serif", 
        urlParam: "Alegreya:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Calligraphic roots, great for literature"
    },
    { 
        name: "Cormorant Garamond", 
        family: "'Cormorant Garamond', serif", 
        category: "serif", 
        urlParam: "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700",
        description: "Display Garamond with classical proportions"
    },
    { 
        name: "Spectral", 
        family: "'Spectral', serif", 
        category: "serif", 
        urlParam: "Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800",
        description: "Screen-first serif, highly readable"
    },
    { 
        name: "Zilla Slab", 
        family: "'Zilla Slab', serif", 
        category: "serif", 
        urlParam: "Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700",
        description: "Contemporary slab serif by Mozilla"
    },
    { 
        name: "Arvo", 
        family: "'Arvo', serif", 
        category: "serif", 
        urlParam: "Arvo:ital,wght@0,400;0,700;1,400;1,700",
        description: "Geometric slab serif with personality"
    },
    { 
        name: "Cardo", 
        family: "'Cardo', serif", 
        category: "serif", 
        urlParam: "Cardo:ital,wght@0,400;0,700;1,400",
        description: "Classical scholarly serif"
    },
    { 
        name: "Libre Caslon Text", 
        family: "'Libre Caslon Text', serif", 
        category: "serif", 
        urlParam: "Libre+Caslon+Text:ital,wght@0,400;0,700;1,400",
        description: "Warm interpretation of Caslon"
    },

    // === SANS-SERIF FONTS (Modern & Clean) ===
    { 
        name: "Inter", 
        family: "'Inter', sans-serif", 
        category: "sans-serif", 
        urlParam: "Inter:wght@100;200;300;400;500;600;700;800;900",
        description: "Modern UI font with excellent metrics"
    },
    { 
        name: "Roboto", 
        family: "'Roboto', sans-serif", 
        category: "sans-serif", 
        urlParam: "Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900",
        description: "Google's system font, universal clarity"
    },
    { 
        name: "Open Sans", 
        family: "'Open Sans', sans-serif", 
        category: "sans-serif", 
        urlParam: "Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800",
        description: "Humanist sans with friendly character"
    },
    { 
        name: "Lato", 
        family: "'Lato', sans-serif", 
        category: "sans-serif", 
        urlParam: "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
        description: "Warm yet stable, semi-rounded forms"
    },
    { 
        name: "Montserrat", 
        family: "'Montserrat', sans-serif", 
        category: "sans-serif", 
        urlParam: "Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Urban geometric inspired by Buenos Aires"
    },
    { 
        name: "Poppins", 
        family: "'Poppins', sans-serif", 
        category: "sans-serif", 
        urlParam: "Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Geometric sans with Indian Devanagari influence"
    },
    { 
        name: "Raleway", 
        family: "'Raleway', sans-serif", 
        category: "sans-serif", 
        urlParam: "Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Elegant sans with sophisticated spacing"
    },
    { 
        name: "Nunito", 
        family: "'Nunito', sans-serif", 
        category: "sans-serif", 
        urlParam: "Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Well-balanced rounded sans"
    },
    { 
        name: "Quicksand", 
        family: "'Quicksand', sans-serif", 
        category: "sans-serif", 
        urlParam: "Quicksand:wght@300;400;500;600;700",
        description: "Friendly display sans with rounded terminals"
    },
    { 
        name: "Work Sans", 
        family: "'Work Sans', sans-serif", 
        category: "sans-serif", 
        urlParam: "Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Optimized for on-screen text at medium sizes"
    },
    { 
        name: "Fira Sans", 
        family: "'Fira Sans', sans-serif", 
        category: "sans-serif", 
        urlParam: "Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Mozilla's humanist sans, clear and open"
    },
    { 
        name: "Rubik", 
        family: "'Rubik', sans-serif", 
        category: "sans-serif", 
        urlParam: "Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Slightly rounded sans with Hebrew roots"
    },
    { 
        name: "Karla", 
        family: "'Karla', sans-serif", 
        category: "sans-serif", 
        urlParam: "Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800",
        description: "Grotesque sans with subtle humanist touches"
    },
    { 
        name: "Josefin Sans", 
        family: "'Josefin Sans', sans-serif", 
        category: "sans-serif", 
        urlParam: "Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700",
        description: "Geometric vintage with Art Deco feel"
    },

    // === MONOSPACE FONTS (Code, Terminal, Typewriter) ===
    { 
        name: "Roboto Mono", 
        family: "'Roboto Mono', monospace", 
        category: "monospace", 
        urlParam: "Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700",
        description: "Neutral monospace for technical writing"
    },
    { 
        name: "Fira Code", 
        family: "'Fira Code', monospace", 
        category: "monospace", 
        urlParam: "Fira+Code:wght@300;400;500;600;700",
        description: "Programming ligatures, developer favorite"
    },
    { 
        name: "Space Mono", 
        family: "'Space Mono', monospace", 
        category: "monospace", 
        urlParam: "Space+Mono:ital,wght@0,400;0,700;1,400;1,700",
        description: "Quirky retro-futuristic monospace"
    },
    { 
        name: "Source Code Pro", 
        family: "'Source Code Pro', monospace", 
        category: "monospace", 
        urlParam: "Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        description: "Adobe's coding font, clear and professional"
    },
    { 
        name: "JetBrains Mono", 
        family: "'JetBrains Mono', monospace", 
        category: "monospace", 
        urlParam: "JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800",
        description: "Modern monospace optimized for developers"
    },
    { 
        name: "Courier Prime", 
        family: "'Courier Prime', monospace", 
        category: "monospace", 
        urlParam: "Courier+Prime:ital,wght@0,400;0,700;1,400;1,700",
        description: "Courier reimagined for screenplays"
    },
    { 
        name: "Inconsolata", 
        family: "'Inconsolata', monospace", 
        category: "monospace", 
        urlParam: "Inconsolata:wght@200;300;400;500;600;700;800;900",
        description: "Humanist monospace for code and terminals"
    },

    // === DISPLAY FONTS (Titles & Atmospheric) ===
    { 
        name: "Abril Fatface", 
        family: "'Abril Fatface', display", 
        category: "display", 
        urlParam: "Abril+Fatface",
        description: "Bold display with Victorian flair"
    },
    { 
        name: "Cinzel", 
        family: "'Cinzel', serif", 
        category: "display", 
        urlParam: "Cinzel:wght@400;500;600;700;800;900",
        description: "Classical Roman capitals for titles"
    },
    { 
        name: "Righteous", 
        family: "'Righteous', display", 
        category: "display", 
        urlParam: "Righteous",
        description: "Retro-futuristic display font"
    },
    { 
        name: "Bebas Neue", 
        family: "'Bebas Neue', display", 
        category: "display", 
        urlParam: "Bebas+Neue",
        description: "Condensed sans, great for headers"
    },
    { 
        name: "Alfa Slab One", 
        family: "'Alfa Slab One', display", 
        category: "display", 
        urlParam: "Alfa+Slab+One",
        description: "Bold slab serif for impact"
    },
    { 
        name: "Bungee", 
        family: "'Bungee', display", 
        category: "display", 
        urlParam: "Bungee",
        description: "Urban display with chromatic layers"
    },
    { 
        name: "Permanent Marker", 
        family: "'Permanent Marker', display", 
        category: "display", 
        urlParam: "Permanent+Marker",
        description: "Hand-drawn marker style"
    },

    // === HANDWRITING FONTS (Personal & Artistic) ===
    { 
        name: "Dancing Script", 
        family: "'Dancing Script', cursive", 
        category: "handwriting", 
        urlParam: "Dancing+Script:wght@400;500;600;700",
        description: "Lively casual script, bouncy baseline"
    },
    { 
        name: "Pacifico", 
        family: "'Pacifico', cursive", 
        category: "handwriting", 
        urlParam: "Pacifico",
        description: "Surf-inspired brush script"
    },
    { 
        name: "Caveat", 
        family: "'Caveat', cursive", 
        category: "handwriting", 
        urlParam: "Caveat:wght@400;500;600;700",
        description: "Handwritten font with natural flow"
    },
    { 
        name: "Patrick Hand", 
        family: "'Patrick Hand', cursive", 
        category: "handwriting", 
        urlParam: "Patrick+Hand",
        description: "Neat handwriting, comic book style"
    },
    { 
        name: "Shadows Into Light", 
        family: "'Shadows Into Light', cursive", 
        category: "handwriting", 
        urlParam: "Shadows+Into+Light",
        description: "Casual scribbled style"
    },
    { 
        name: "Indie Flower", 
        family: "'Indie Flower', cursive", 
        category: "handwriting", 
        urlParam: "Indie+Flower",
        description: "Friendly handwritten with personality"
    },
    { 
        name: "Satisfy", 
        family: "'Satisfy', cursive", 
        category: "handwriting", 
        urlParam: "Satisfy",
        description: "Connecting script with vintage charm"
    },
    { 
        name: "Kalam", 
        family: "'Kalam', cursive", 
        category: "handwriting", 
        urlParam: "Kalam:wght@300;400;700",
        description: "Handwriting with Indian influence"
    },
];

/**
 * Get fonts by category
 */
export const getFontsByCategory = (category: FontConfig['category']) => {
    return SUPPORTED_FONTS.filter(font => font.category === category);
};

/**
 * Get all font categories
 */
export const FONT_CATEGORIES = {
    serif: 'Serif (Classic & Literary)',
    'sans-serif': 'Sans-Serif (Modern & Clean)',
    monospace: 'Monospace (Code & Terminal)',
    display: 'Display (Titles & Headers)',
    handwriting: 'Handwriting (Personal & Artistic)',
};
