<div align="center">
  <h1 align="center">Levon</h1>
  <p align="center"><strong>Your Personal AI Novelist & Literary Sanctuary</strong></p>
  <p align="center">
    <img src="https://img.shields.io/badge/Status-Alpha-indigo?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/Generative_AI-Gemini-8e44ad?style=flat-square" alt="AI" />
    <img src="https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind-blue?style=flat-square" alt="Stack" />
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

### 🎨 Ultimate Customization (New!)
The Levon interface is a chameleon, capable of transforming to match your mood or genre:
-   **Theming**: Robust **Light**, **Dark**, and **System** modes.
-   **Typography Control**: Choose from **40+ curated Google Fonts** (Serif, Sans, Display, Monospace) with precision controls for size, weight, and line height.
-   **Reading Environments**: **40+ Reading Templates** that fundamentally change the atmosphere. Write in a "Cozy Library", "Midnight Terminal", "Cyberpunk City", or on "Old Parchment".
-   **Persistence**: Your preferences are saved instantly to `localStorage`.

### 📚 The Shelf
-   **Library Management**: Organize multiple novels and projects.
-   **PDF Export**: generate professional PDFs of your manuscript with a single click.

## 🛠️ Technology Stack
-   **Frontend**: React 19, Vite, TypeScript
-   **Styling**: Tailwind CSS (with custom `prose-book` typography)
-   **State Management**: React Context (`SettingsContext` for comprehensive app-wide preference management)
-   **AI**: Google Gemini API integration for generation and logic
-   **Persistence**: Browser `localStorage` & Service Worker caching for offline-first capabilities

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

## 🔮 Roadmap
-   [ ] Cloud Sync & Multi-Device Support
-   [ ] EPUB & Kindle Export
-   [ ] Advanced Plotting Tools (Hero's Journey, Save the Cat)
-   [ ] Community Template Sharing

---

<div align="center">
  <p><em>"There is no greater agony than bearing an untold story inside you." — Maya Angelou</em></p>
  <p>Crafted with ❤️ and AI.</p>
</div>
