<div align="center">
  <h1 align="center">Levon</h1>
  <p align="center"><strong>Your Personal AI Novelist & Literary Sanctuary</strong></p>
  <p align="center">
    <img src="https://img.shields.io/badge/Status-Alpha-indigo?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/Generative_AI-Gemini-8e44ad?style=flat-square" alt="AI" />
    <img src="https://img.shields.io/badge/Stack-React_19_|_Vite_|_Tailwind-blue?style=flat-square" alt="Stack" />
  </p>
</div>

---

## 📖 Overview

**Levon** is an advanced AI-powered creative writing suite designed to assist authors in crafting full-length novels. Unlike generic chat assistants, Levon is built with a deep understanding of narrative structure, character archetypes, and literary tropes.

It serves as both a **collaborative co-author** and a **distraction-free writing sanctuary**, offering a "MAX" level customization experience to suit any writer's aesthetic.

## ✨ Key Features

### 🧠 Intelligent Creation
-   **Inception Wizard**: Guided workflow to define your novel's genre, tone, and core premise.
-   **Character Forge**: Create deep, multifaceted characters with distinct voices, motivations, and arcs.
-   **Lorebook**: A persistent knowledge base that tracks world-building details, locations, and magic systems to ensure consistency.

### ✍️ The Writer's Interface
-   **Chapter Drafting**: AI assistance that writes prose chapter-by-chapter, adhering to your outline.
-   **Context Awareness**: The AI mimics your established style and references the Lorebook automatically.
-   **Distraction-Free Mode**: A clean, immersive UI designed for flow state.

### 🎨 Ultimate Customization (Enhanced!)
The Levon interface is a chameleon, capable of transforming to match your mood or genre:

-   **Advanced Theming**: 
    - Robust **Light**, **Dark**, and **System** modes with instant switching
    - Automatic system preference detection
    - Smooth theme transitions throughout the entire app
    - Dark mode optimized for night reading with reduced eye strain

-   **Premium Typography**: 
    - **56+ Curated Google Fonts** across 5 categories:
      - **Serif** (16 fonts): Classic book & literature fonts
      - **Sans-Serif** (14 fonts): Modern & clean interfaces  
      - **Monospace** (7 fonts): Code, terminal, & typewriter styles
      - **Display** (7 fonts): Bold titles & headers
      - **Handwriting** (8 fonts): Personal & artistic touches
    - Smart font search and filtering by category
    - Live preview with your selected font
    - Precision controls for:
      - Font size (12-32px)
      - Line height (1.0-2.5x)
      - Font weight (100-900)

-   **45 Reading Templates**:
    - Organized into 7 categories:
      - **Clean & Minimal** (8 templates): Professional, simple aesthetics
      - **Textured & Paper** (6 templates): Traditional, vintage vibes
      - **Dark Themes** (8 templates): Night reading, reduced eye strain
      - **Nature & Organic** (8 templates): Calming earth tones
      - **Retro & Vintage** (6 templates): Nostalgic, classic styles
      - **Cyberpunk & Sci-Fi** (6 templates): Futuristic, tech aesthetics
      - **High Contrast** (4 templates): Accessibility-focused designs
    - Real-time template switching
    - Each template carefully designed for readability
    - Support for background images, gradients, and solid colors

-   **Rich Animations**:
    - Smooth page transitions and micro-interactions
    - Hover effects on interactive elements
    - Loading states with elegant animations
    - Staggered animation delays for visual polish
    - Book cover 3D hover effects
    - Responsive button animations
    - All animations optimized for performance

-   **Instant Persistence**: 
    - All preferences saved automatically to localStorage
    - Settings persist across sessions
    - No account required for customization

### 📚 The Shelf
-   **Library Management**: Organize multiple novels and projects.
-   **PDF Export**: Generate professional PDFs of your manuscript with a single click.

## 🛠️ Technology Stack
-   **Frontend**: React 19, Vite, TypeScript
-   **Styling**: Tailwind CSS (with custom typography and animations)
-   **State Management**: React Context (`SettingsContext` for comprehensive app-wide preference management)
-   **AI**: Google Gemini API integration for generation and logic
-   **Persistence**: Browser `localStorage` & Service Worker caching for offline-first capabilities
-   **Performance**: Optimized font loading, lazy imports, and efficient re-renders

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/89pl/Levon.git
    cd Levon
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    Create a `.env.local` file in the root directory:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Launch the Studio:**
    ```bash
    npm run dev
    ```

5.  **Access the application:**
    Open your browser and navigate to `http://localhost:3000`

## 🎨 Customization Features in Detail

### Theme System
The app features a sophisticated three-mode theme system:
- **Light Mode**: Clean, bright interface perfect for daytime writing
- **Dark Mode**: Eye-friendly dark theme for night sessions
- **System Mode**: Automatically adapts to your OS theme preferences

All UI elements, including buttons, cards, and text, smoothly transition between themes.

### Typography Control
Choose from 56+ professionally curated fonts:
- All fonts are Google Fonts with proper loading optimization
- Fonts are categorized for easy discovery
- Search functionality helps you find the perfect typeface
- Real-time preview shows exactly how your text will look

### Reading Templates
Transform your writing environment with 45 unique templates:
- Each template has been tested for readability
- Templates include proper contrast for all lighting conditions
- Background textures, gradients, and solid colors available
- Organized by mood and aesthetic preference

## 📱 Progressive Web App (PWA)
Levon is a fully-featured PWA with:
- Installable on desktop and mobile devices
- Offline-capable with service worker caching
- Custom app icon (192x192 and 512x512)
- Optimized for mobile and tablet screens

## 🔮 Roadmap
-   [x] 56+ Professional fonts with categorization
-   [x] 45 Reading templates across 7 categories
-   [x] Advanced light/dark/system theme modes
-   [x] Comprehensive animations and micro-interactions
-   [x] PWA support with app icon
-   [ ] Cloud Sync & Multi-Device Support
-   [ ] EPUB & Kindle Export
-   [ ] Advanced Plotting Tools (Hero's Journey, Save the Cat)
-   [ ] Community Template Sharing
-   [ ] Custom theme builder
-   [ ] Font pairing suggestions
-   [ ] Reading statistics and analytics

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p><em>"There is no greater agony than bearing an untold story inside you." — Maya Angelou</em></p>
  <p>Crafted with ❤️ and AI.</p>
</div>
