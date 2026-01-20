export interface FontConfig {
    name: string;
    family: string;
    category: 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting';
    urlParam: string; // The part after family= in Google Fonts URL
}

export const SUPPORTED_FONTS: FontConfig[] = [
    // SERIF (Classic, Book-like)
    { name: "Lora", family: "'Lora', serif", category: "serif", urlParam: "Lora:ital,wght@0,400;0,700;1,400;1,700" },
    { name: "Merriweather", family: "'Merriweather', serif", category: "serif", urlParam: "Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900" },
    { name: "Playfair Display", family: "'Playfair Display', serif", category: "serif", urlParam: "Playfair+Display:ital,wght@0,400..900;1,400..900" },
    { name: "EB Garamond", family: "'EB Garamond', serif", category: "serif", urlParam: "EB+Garamond:ital,wght@0,400..800;1,400..800" },
    { name: "Crimson Text", family: "'Crimson Text', serif", category: "serif", urlParam: "Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700" },
    { name: "Libre Baskerville", family: "'Libre Baskerville', serif", category: "serif", urlParam: "Libre+Baskerville:ital,wght@0,400;0,700;1,400" },
    { name: "PT Serif", family: "'PT Serif', serif", category: "serif", urlParam: "PT+Serif:ital,wght@0,400;0,700;1,400;1,700" },
    { name: "Bitter", family: "'Bitter', serif", category: "serif", urlParam: "Bitter:ital,wght@0,100..900;1,100..900" },
    { name: "Vollkorn", family: "'Vollkorn', serif", category: "serif", urlParam: "Vollkorn:ital,wght@0,400..900;1,400..900" },
    { name: "Alegreya", family: "'Alegreya', serif", category: "serif", urlParam: "Alegreya:ital,wght@0,400..900;1,400..900" },
    { name: "Cormorant Garamond", family: "'Cormorant Garamond', serif", category: "serif", urlParam: "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700" },
    { name: "Spectral", family: "'Spectral', serif", category: "serif", urlParam: "Spectral:ital,wght@0,200..800;1,200..800" },
    { name: "Zilla Slab", family: "'Zilla Slab', serif", category: "serif", urlParam: "Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700" },
    { name: "Tinos", family: "'Tinos', serif", category: "serif", urlParam: "Tinos:ital,wght@0,400;0,700;1,400;1,700" },
    { name: "Arvo", family: "'Arvo', serif", category: "serif", urlParam: "Arvo:ital,wght@0,400;0,700;1,400;1,700" },

    // SANS-SERIF (Modern, Clean)
    { name: "Inter", family: "'Inter', sans-serif", category: "sans-serif", urlParam: "Inter:wght@100..900" },
    { name: "Roboto", family: "'Roboto', sans-serif", category: "sans-serif", urlParam: "Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900" },
    { name: "Open Sans", family: "'Open Sans', sans-serif", category: "sans-serif", urlParam: "Open+Sans:ital,wght@0,300..800;1,300..800" },
    { name: "Lato", family: "'Lato', sans-serif", category: "sans-serif", urlParam: "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900" },
    { name: "Montserrat", family: "'Montserrat', sans-serif", category: "sans-serif", urlParam: "Montserrat:ital,wght@0,100..900;1,100..900" },
    { name: "Poppins", family: "'Poppins', sans-serif", category: "sans-serif", urlParam: "Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" },
    { name: "Raleway", family: "'Raleway', sans-serif", category: "sans-serif", urlParam: "Raleway:ital,wght@0,100..900;1,100..900" },
    { name: "Oswald", family: "'Oswald', sans-serif", category: "sans-serif", urlParam: "Oswald:wght@200..700" },
    { name: "Nunito", family: "'Nunito', sans-serif", category: "sans-serif", urlParam: "Nunito:ital,wght@0,200..1000;1,200..1000" },
    { name: "Quicksand", family: "'Quicksand', sans-serif", category: "sans-serif", urlParam: "Quicksand:wght@300..700" },
    { name: "Work Sans", family: "'Work Sans', sans-serif", category: "sans-serif", urlParam: "Work+Sans:ital,wght@0,100..900;1,100..900" },
    { name: "Fira Sans", family: "'Fira Sans', sans-serif", category: "sans-serif", urlParam: "Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" },
    { name: "Rubik", family: "'Rubik', sans-serif", category: "sans-serif", urlParam: "Rubik:ital,wght@0,300..900;1,300..900" },

    // MONOSPACE (Retro, Terminal, Drafting)
    { name: "Roboto Mono", family: "'Roboto Mono', monospace", category: "monospace", urlParam: "Roboto+Mono:ital,wght@0,100..700;1,100..700" },
    { name: "Fira Code", family: "'Fira Code', monospace", category: "monospace", urlParam: "Fira+Code:wght@300..700" },
    { name: "Space Mono", family: "'Space Mono', monospace", category: "monospace", urlParam: "Space+Mono:ital,wght@0,400;0,700;1,400;1,700" },
    { name: "Source Code Pro", family: "'Source Code Pro', monospace", category: "monospace", urlParam: "Source+Code+Pro:ital,wght@0,200..900;1,200..900" },
    { name: "DM Mono", family: "'DM Mono', monospace", category: "monospace", urlParam: "DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500" },

    // DISPLAY / HANDWRITING (Atmospheric)
    { name: "Patrick Hand", family: "'Patrick Hand', cursive", category: "handwriting", urlParam: "Patrick+Hand" },
    { name: "Dancing Script", family: "'Dancing Script', cursive", category: "handwriting", urlParam: "Dancing+Script:wght@400..700" },
    { name: "Amatic SC", family: "'Amatic SC', cursive", category: "handwriting", urlParam: "Amatic+SC:wght@400;700" },
    { name: "Caveat", family: "'Caveat', cursive", category: "handwriting", urlParam: "Caveat:wght@400..700" },
    { name: "Shadows Into Light", family: "'Shadows Into Light', cursive", category: "handwriting", urlParam: "Shadows+Into+Light" },
    { name: "Indie Flower", family: "'Indie Flower', cursive", category: "handwriting", urlParam: "Indie+Flower" },
    { name: "Abril Fatface", family: "'Abril Fatface', display", category: "display", urlParam: "Abril+Fatface" },
    { name: "Righteous", family: "'Righteous', display", category: "display", urlParam: "Righteous" },
    { name: "Cinzel", family: "'Cinzel', serif", category: "display", urlParam: "Cinzel:wght@400..900" },
];
