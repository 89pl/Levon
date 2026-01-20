
import React, { useState, useEffect, useRef } from 'react';
import { Novel, View, Chapter, OutlineItem, Character, Reference } from './types';
import { generateOutline, generateChapterContent, summarizeChapterForLorebook } from './geminiService';
import { jsPDF } from 'jspdf';
import { extractTextFromPdf } from './pdfService';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import Settings from './views/Settings';

// --- Constants ---

const GENRE_CATEGORIES = {
  "Speculative": [
    "High Fantasy", "Urban Fantasy", "Dark Fantasy", "Epic Fantasy", "Grimdark",
    "Cyberpunk", "Space Opera", "Hard Science Fiction", "Dystopian", "Post-Apocalyptic",
    "Solarpunk", "Steampunk", "Dieselpunk", "Magical Realism", "Alternate History", "Gaslamp Fantasy"
  ],
  "Crime & Mystery": [
    "Noir", "Hardboiled", "Cozy Mystery", "Police Procedural", "Legal Thriller",
    "Medical Thriller", "Spy/Espionage", "Whodunit", "Psychological Thriller", "Techno-thriller",
    "Political Thriller", "Caper", "True Crime Fiction"
  ],
  "Romance": [
    "Regency Romance", "Contemporary Romance", "Paranormal Romance", "Historical Romance",
    "Gothic Romance", "Clean Romance", "Steamy Romance", "Romantic Comedy", "Dark Romance"
  ],
  "Horror": [
    "Supernatural Horror", "Psychological Horror", "Cosmic Horror", "Gothic Horror",
    "Slasher", "Body Horror", "Splatterpunk", "Folk Horror"
  ],
  "Literary & Drama": [
    "Literary Fiction", "Contemporary Fiction", "Coming-of-Age (YA)", "Middle Grade",
    "Historical Fiction", "Satire", "Bizarro Fiction", "Southern Gothic", "Epistolary"
  ],
  "Universal Themes & Tropes": [
    "Slow Burn", "Enemies to Lovers", "Found Family", "Heist", "Revenge / Vendetta",
    "Redemption Quest", "Survival", "Second Chance", "Court Intrigue", "Slice of Life",
    "Anti-Hero Lead", "Tragedy", "Whimsical", "Surrealism", "Pulp / Grindhouse",
    "High Stakes / Epic", "Small Town", "Road Trip / Odyssey", "Locked Room",
    "Hidden Identity", "Forbidden Love", "The Chosen One", "Fallen Hero", "Fish out of Water"
  ],
  "Other": [
    "Western", "LitRPG", "GameLit", "Military Fiction", "Biographical Fiction",
    "Adventure", "Fairy Tale Retelling", "Mythology"
  ]
};

const ALL_GENRES = Object.values(GENRE_CATEGORIES).flat().sort();

// --- UI Components ---

const BookCover: React.FC<{ novel: Novel; onClick: () => void }> = ({ novel, onClick }) => {
  const { settings } = useSettings();
  const completion = Math.round((novel.chapters.filter(c => c).length / novel.outline.length) * 100);
  const colors = [
    'from-indigo-600 to-blue-800',
    'from-emerald-600 to-teal-800',
    'from-rose-600 to-pink-800',
    'from-amber-600 to-orange-800',
    'from-slate-700 to-slate-900'
  ];
  const colorIndex = novel.title.length % colors.length;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer perspective-1000 active:scale-[0.97] transition-all"
    >
      <div className={`relative w-full aspect-[2/3] rounded-r-2xl rounded-l-sm bg-gradient-to-br ${colors[colorIndex]} book-shadow overflow-hidden p-8 flex flex-col justify-between transform group-hover:rotate-y-12 transition-all duration-500 ring-1 ring-black/10`}>
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 backdrop-blur-sm" />
        <div className="relative z-10 space-y-2">
          <p className="text-[10px] font-black text-white/50 tracking-[0.2em] uppercase mb-1 truncate">
            {novel.genre}
            {(novel.subGenres?.length || 0) > 0 && ` • ${novel.subGenres[0]}`}
            {(novel.subGenres?.length || 0) > 1 && ` +${novel.subGenres.length - 1}`}
          </p>
          <h3 className={`text-2xl text-white leading-tight line-clamp-3 drop-shadow-md`} style={{ fontFamily: settings.fontFamily }}>{novel.title}</h3>
        </div>
        <div className="relative z-10 mt-auto">
          <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden mb-3 ring-1 ring-white/10">
            <div className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" style={{ width: `${completion}%` }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-white/90 font-black uppercase tracking-wider">
            <span>{completion}% WEAVED</span>
            <span className="opacity-60">LEVON ED.</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>
    </div>
  );
};

const Header: React.FC<{ onBack?: () => void; onHome?: () => void; title: string; subtitle?: string; actions?: React.ReactNode; isOnline?: boolean }> = ({ onBack, onHome, title, subtitle, actions, isOnline }) => (
  <header className="sticky top-0 z-40 glass-panel border-b border-white/20 px-6 py-5 flex items-center gap-4 shadow-sm">
    {onBack && (
      <button onClick={onBack} className="p-2.5 -ml-2.5 hover:bg-black/5 rounded-2xl transition-all active:scale-90 text-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
    )}
    <div className="flex-1 overflow-hidden">
      <h1 className="font-display text-2xl font-black tracking-tight truncate text-slate-900 leading-none mb-0.5">{title}</h1>
      <div className="flex items-center gap-2">
        {subtitle && <p className="text-[10px] font-black text-indigo-600/60 uppercase tracking-[0.2em] truncate">{subtitle}</p>}
        {isOnline !== undefined && (
          <div className="flex items-center gap-1 bg-white/50 px-1.5 py-0.5 rounded-full border border-white/40">
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]'}`} />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3">
      {actions}
      <button onClick={onHome} className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-950 flex items-center justify-center text-white font-display font-black text-lg shadow-lg shadow-black/20 ring-1 ring-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer">
        L
      </button>
    </div>
  </header>
);

const Button: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'glass';
  className?: string;
  loading?: boolean;
  type?: "button" | "submit";
}> = ({ onClick, children, variant = 'primary', className = '', loading = false, type = "button" }) => {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:shadow-none',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:shadow-none',
    accent: 'bg-amber-500 text-white hover:bg-amber-600 shadow-xl shadow-amber-500/20 active:shadow-none',
    outline: 'border-2 border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    glass: 'glass-panel border-white/40 text-slate-900 hover:bg-white/40',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.96] ${variants[variant]} ${className}`}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      ) : children}
    </button>
  );
};

// --- Main App ---

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

function AppContent() {
  const [novels, setNovels] = useState<Novel[]>(() => {
    const saved = localStorage.getItem('levon_novels_v2');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((n: any) => ({
      subGenres: [],
      lorebook: [],
      referenceIds: [],
      ...n
    }));
  });
  const [references, setReferences] = useState<Reference[]>(() => {
    const saved = localStorage.getItem('levon_references_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentView, setCurrentView] = useState<View | 'settings'>('home');
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [instructionText, setInstructionText] = useState('');
  const [genreSearch, setGenreSearch] = useState('');
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [detailTab, setDetailTab] = useState<'chapters' | 'characters' | 'lore' | 'refs'>('chapters');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoreModalOpen, setIsLoreModalOpen] = useState(false);
  const [editingLoreIndex, setEditingLoreIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('levon_novels_v2', JSON.stringify(novels));
  }, [novels]);

  useEffect(() => {
    localStorage.setItem('levon_references_v1', JSON.stringify(references));
  }, [references]);

  useEffect(() => {
    if (currentView === 'writer' && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentView, selectedChapterIndex]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const selectedNovel = novels.find(n => n.id === selectedNovelId);
  const [newNovel, setNewNovel] = useState({ title: '', genre: 'High Fantasy', subGenres: [] as string[], premise: '' });

  const filteredGenres = ALL_GENRES.filter(g => g.toLowerCase().includes(genreSearch.toLowerCase()));

  const handleCreateNovel = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newNovel.title || !newNovel.premise) return;
    if (!isOnline) {
      alert("Internet connection required to architect the story.");
      return;
    }
    setIsGenerating(true);
    try {
      const data = await generateOutline(newNovel);
      const id = Date.now().toString();
      const novel: Novel = {
        id,
        ...newNovel,
        characters: data.characters,
        outline: data.outline,
        lorebook: [],
        referenceIds: [],
        chapters: [],
        createdAt: Date.now()
      };
      setNovels([novel, ...novels]);
      setSelectedNovelId(id);
      setCurrentView('novel');
    } catch (error) {
      console.error(error);
      alert("Consultation with the AI Muse failed. Please check your network.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWriteChapter = async (index: number, instruction?: string) => {
    if (!selectedNovel) return;
    if (!isOnline) {
      alert("Internet connection required to weave the manuscript.");
      return;
    }
    setIsGenerating(true);
    try {
      const activeRefs = references.filter(r => selectedNovel.referenceIds?.includes(r.id));
      const refContext = activeRefs.map(r => r.content).join('\n\n');

      const { title, content } = await generateChapterContent(selectedNovel, index, instruction, refContext);
      const newChapter: Chapter = {
        id: Date.now().toString(),
        chapterNumber: index + 1,
        title: title || selectedNovel.outline[index].title,
        content,
        status: 'draft',
        aiPrompt: instruction
      };

      const updatedNovels = novels.map(n => {
        if (n.id === selectedNovel.id) {
          const updatedChapters = [...n.chapters];
          updatedChapters[index] = newChapter;
          return { ...n, chapters: updatedChapters };
        }
        return n;
      });
      setNovels(updatedNovels);
      setSelectedChapterIndex(index);
      setCurrentView('writer');
      setInstructionText('');

      // Auto-summarize for Lorebook asynchronously
      summarizeChapterForLorebook(selectedNovel, content).then(facts => {
        if (facts.length > 0) {
          setNovels(prev => prev.map(n => {
            if (n.id === selectedNovel.id) {
              const currentLore = n.lorebook || [];
              return { ...n, lorebook: [...currentLore, ...facts].slice(-50) }; // Keep last 50 key facts
            }
            return n;
          }));
        }
      });
    } catch (error) {
      console.error(error);
      alert("The manuscript was lost in transit. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteNovel = (id: string) => {
    if (window.confirm("Abandon this manuscript forever?")) {
      setNovels(novels.filter(n => n.id !== id));
      setCurrentView('home');
    }
  };

  const saveCharacter = (char: Character) => {
    if (!selectedNovel) return;
    const isEditing = selectedNovel.characters.some(c => c.id === char.id);
    const updatedNovels = novels.map(n => {
      if (n.id === selectedNovel.id) {
        const updatedChars = isEditing
          ? n.characters.map(c => c.id === char.id ? char : c)
          : [...n.characters, char];
        return { ...n, characters: updatedChars };
      }
      return n;
    });
    setNovels(updatedNovels);
    setIsCharacterModalOpen(false);
    setEditingCharacter(null);
  };

  const deleteCharacter = (charId: string) => {
    if (!selectedNovel) return;
    const updatedNovels = novels.map(n => {
      if (n.id === selectedNovel.id) {
        return { ...n, characters: n.characters.filter(c => c.id !== charId) };
      }
      return n;
    });
    setNovels(updatedNovels);
    setIsCharacterModalOpen(false);
    setEditingCharacter(null);
  };

  const markChapterComplete = (index: number) => {
    if (!selectedNovel) return;
    const updatedNovels = novels.map(n => {
      if (n.id === selectedNovel.id) {
        const updatedChapters = [...n.chapters];
        if (updatedChapters[index]) {
          updatedChapters[index] = { ...updatedChapters[index]!, status: 'completed' };
        }
        return { ...n, chapters: updatedChapters };
      }
      return n;
    });
    setNovels(updatedNovels);
  };

  const handleExportPdf = () => {
    if (!selectedNovel) return;
    const doc = new jsPDF();
    let y = 20;

    // Title Page
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(selectedNovel.title, 105, 80, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`A ${selectedNovel.genre} Novel`, 105, 95, { align: 'center' });
    doc.text("Generated by Levon AI", 105, 270, { align: 'center' });

    selectedNovel.chapters.forEach((ch, i) => {
      if (!ch) return;
      doc.addPage();
      y = 20;

      doc.setFontSize(10);
      doc.text(`CHAPTER ${ch.chapterNumber}`, 105, y, { align: 'center' });
      y += 15;

      doc.setFontSize(18);
      doc.text(ch.title, 105, y, { align: 'center' });
      y += 20;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(ch.content, 170);
      lines.forEach((line: string) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 20, y);
        y += 6;
      });
    });

    doc.save(`${selectedNovel.title.replace(/\s+/g, '_')}_Levon.pdf`);
  };

  const renderHome = () => (
    <div className="p-8 space-y-12 pb-32">

      {novels.length === 0 ? (
        <div className="py-20 text-center space-y-8 animate-float">
          <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 border border-slate-100 shadow-2xl shadow-slate-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight">The ink is waiting...</h3>
            <p className="text-slate-400 text-sm max-w-[240px] mx-auto leading-relaxed font-medium">Your library is empty. Let's breathe life into your first masterpiece.</p>
          </div>
          <Button onClick={() => setCurrentView('create')} variant="primary" className="mx-auto rounded-full px-10 h-14">Architect a New World</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {novels.map(novel => (
            <BookCover
              key={novel.id}
              novel={novel}
              onClick={() => { setSelectedNovelId(novel.id); setCurrentView('novel'); }}
            />
          ))}
        </div>
      )}

      {novels.length > 0 && (
        <div className="pt-8 border-t border-slate-200/60">
          <div className="glass-panel rounded-3xl p-6 flex items-center gap-5 border-white/40">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Writing Streak</p>
              <p className="text-sm font-black text-slate-800">You're on a roll! Keep weaving.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCreate = () => (
    <form onSubmit={handleCreateNovel} className="p-8 space-y-10 pb-40">
      <div className="space-y-1">
        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em]">Inception</p>
        <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight">New Concept</h2>
        <p className="text-slate-500 text-sm font-medium">Define the soul of your next masterpiece.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title of the Work</label>
          <input
            autoFocus
            type="text"
            placeholder="e.g. Whispers of the Void"
            className="w-full bg-white border-2 border-slate-100 rounded-3xl px-6 py-5 focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500/50 outline-none transition-all font-bold text-lg shadow-sm"
            value={newNovel.title}
            onChange={e => setNewNovel({ ...newNovel, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Literary Genre</label>

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <input
              type="text"
              placeholder="Filter genres (e.g. 'Cyberpunk')"
              className="w-full bg-slate-100/50 border-none rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
              value={genreSearch}
              onChange={e => setGenreSearch(e.target.value)}
            />
          </div>

          <div className="max-h-80 overflow-y-auto no-scrollbar border-2 border-slate-50 rounded-[2rem] p-4 bg-white/40 glass-panel shadow-inner">
            {genreSearch ? (
              <div className="flex flex-wrap gap-2.5">
                {filteredGenres.map(g => {
                  const isTrope = GENRE_CATEGORIES["Universal Themes & Tropes"].includes(g);
                  const isSelected = isTrope ? newNovel.subGenres.includes(g) : newNovel.genre === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        if (isTrope) {
                          const updated = isSelected
                            ? newNovel.subGenres.filter(sg => sg !== g)
                            : [...newNovel.subGenres, g];
                          setNewNovel({ ...newNovel, subGenres: updated });
                        } else {
                          setNewNovel({ ...newNovel, genre: g });
                        }
                      }}
                      className={`py-3 px-5 rounded-xl text-xs font-black border-2 transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 shadow-sm'}`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            ) : (
              Object.entries(GENRE_CATEGORIES).map(([cat, genres]) => (
                <div key={cat} className="mb-8 last:mb-0">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 px-2">{cat}</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {genres.map(g => {
                      const isTrope = cat === "Universal Themes & Tropes";
                      const isSelected = isTrope ? newNovel.subGenres.includes(g) : newNovel.genre === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            if (isTrope) {
                              const updated = isSelected
                                ? newNovel.subGenres.filter(sg => sg !== g)
                                : [...newNovel.subGenres, g];
                              setNewNovel({ ...newNovel, subGenres: updated });
                            } else {
                              setNewNovel({ ...newNovel, genre: g });
                            }
                          }}
                          className={`py-3 px-5 rounded-xl text-xs font-black border-2 transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105 ring-4 ring-white' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 shadow-sm'}`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">The Premise</label>
          <textarea
            rows={5}
            placeholder="Describe the world, the conflict, and the feeling you want to evoke..."
            className="w-full bg-white border-2 border-slate-100 rounded-3xl px-6 py-5 focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500/50 outline-none transition-all font-bold text-lg leading-relaxed resize-none shadow-sm"
            value={newNovel.premise}
            onChange={e => setNewNovel({ ...newNovel, premise: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="pt-8 pb-32">
        <Button type="submit" loading={isGenerating} className="w-full h-16 text-lg rounded-3xl shadow-xl shadow-indigo-600/10">
          {isGenerating ? "Consulting the Muses..." : "Architect the Story"}
        </Button>
      </div>
    </form>
  );

  const renderNovelDetail = () => {
    if (!selectedNovel) return null;
    const isNovelLocked = !!selectedNovel.chapters[0];

    return (
      <div className="pb-32">
        <div className="p-8 pb-4 glass-panel border-b border-white/20 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-black text-slate-900 leading-tight tracking-tight">{selectedNovel.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">{selectedNovel.genre}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedNovel.status || 'Drafting'}</span>
              </div>
            </div>
            <button
              onClick={() => deleteNovel(selectedNovel.id)}
              className="p-3 bg-white/50 rounded-2xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-white/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
          </div>

          <div className="flex gap-4 border-b border-slate-100 pb-px">
            {(['chapters', 'characters', 'lore', 'refs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setDetailTab(tab)}
                className={`pb-3 px-1 text-[10px] font-black uppercase tracking-widest transition-all relative ${detailTab === tab ? 'text-indigo-600' : 'text-slate-400 opacity-60'}`}
              >
                {tab}
                {detailTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {detailTab === 'chapters' && (
            <div className="space-y-6">
              {selectedNovel.outline.map((item, idx) => {
                const chapter = selectedNovel.chapters[idx];
                const isWritten = !!chapter;
                const isCompleted = chapter?.status === 'completed';
                const canStart = idx === 0 || !!selectedNovel.chapters[idx - 1]?.id;

                return (
                  <div key={idx} className={`border-2 p-6 rounded-[2rem] transition-all duration-500 ${isWritten ? 'bg-white border-indigo-100 shadow-lg' : 'bg-slate-50/50 border-slate-100 opacity-60'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Chapter {idx + 1}</p>
                        <h4 className="font-display font-black text-xl text-slate-800">{isWritten ? chapter.title : item.title}</h4>
                      </div>
                      {isCompleted && <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-1 rounded-lg uppercase border border-emerald-100">Sealed</span>}
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">{item.summary}</p>
                    <div className="flex gap-3">
                      {isWritten ? (
                        <Button onClick={() => { setSelectedChapterIndex(idx); setCurrentView('writer'); }} variant="primary" className="flex-1 !py-3 !text-[10px] rounded-xl">Read</Button>
                      ) : (
                        <Button onClick={() => handleWriteChapter(idx)} loading={isGenerating} disabled={!canStart} className="w-full !py-3 !text-[10px] rounded-xl">{!canStart ? "Complete Previous" : "Weave"}</Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {detailTab === 'characters' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cast of Souls</h3>
                {!isNovelLocked && <button onClick={() => { setEditingCharacter(null); setIsCharacterModalOpen(true); }} className="text-[10px] font-black text-indigo-600 uppercase">Enlist+</button>}
              </div>
              <div className="grid gap-4">
                {selectedNovel.characters.map(char => (
                  <div key={char.id} onClick={() => { if (!isNovelLocked) { setEditingCharacter(char); setIsCharacterModalOpen(true); } }} className="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-display font-black text-indigo-300 text-xl">{char.name[0]}</div>
                    <div>
                      <h4 className="font-black text-slate-900 leading-tight">{char.name}</h4>
                      <p className="text-[10px] text-indigo-600 font-black uppercase tracking-wider">{char.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailTab === 'lore' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Story Memory</h3>
                  <p className="text-[9px] font-bold text-slate-400">Updates after each chapter</p>
                </div>
                <button
                  onClick={() => { setEditingLoreIndex(null); setIsLoreModalOpen(true); }}
                  className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Entry</span>
                </button>
              </div>
              <div className="space-y-3">
                {selectedNovel.lorebook?.length > 0 ? selectedNovel.lorebook.map((fact, i) => (
                  <div key={i} className="p-5 bg-white border-2 border-slate-50 rounded-[2rem] flex gap-4 items-start group hover:border-indigo-100 transition-all shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <p className="flex-1 text-xs font-bold text-slate-600 italic leading-relaxed">{fact}</p>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => { setEditingLoreIndex(i); setIsLoreModalOpen(true); }}
                        className="p-2 text-slate-300 hover:text-indigo-600 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                      </button>
                      <button
                        onClick={() => {
                          const updated = (selectedNovel.lorebook || []).filter((_, idx) => idx !== i);
                          setNovels(prev => prev.map(n => n.id === selectedNovel.id ? { ...n, lorebook: updated } : n));
                        }}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Memory is empty</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {detailTab === 'refs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Parchments</h3>
                <button onClick={() => setCurrentView('shelf')} className="text-[10px] font-black text-indigo-600 uppercase">The Shelf→</button>
              </div>
              <div className="space-y-4">
                {references.map(ref => {
                  const isLinked = selectedNovel.referenceIds?.includes(ref.id);
                  return (
                    <button
                      key={ref.id}
                      onClick={() => {
                        const updated = isLinked
                          ? selectedNovel.referenceIds.filter(id => id !== ref.id)
                          : [...(selectedNovel.referenceIds || []), ref.id];
                        setNovels(prev => prev.map(n => n.id === selectedNovel.id ? { ...n, referenceIds: updated } : n));
                      }}
                      className={`w-full p-6 rounded-[2rem] border-2 transition-all flex items-center gap-4 ${isLinked ? 'bg-indigo-50 border-indigo-200 shadow-md' : 'bg-white border-slate-50 shadow-sm opacity-60'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLinked ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14.5 2 14.5 7 20 7" /></svg>
                      </div>
                      <div className="flex-1 text-left overflow-hidden">
                        <h4 className={`font-black text-sm truncate ${isLinked ? 'text-indigo-900' : 'text-slate-900'}`}>{ref.name}</h4>
                        <p className={`text-[10px] font-black uppercase tracking-tighter ${isLinked ? 'text-indigo-600' : 'text-slate-400'}`}>{isLinked ? 'Attached for Context' : 'Stored in Shelf'}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isLinked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-100'}`}>
                        {isLinked && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                    </button>
                  );
                })}
                {references.length === 0 && (
                  <div className="p-12 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No references found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWriter = () => {
    if (!selectedNovel || selectedChapterIndex === null) return null;
    const chapter = selectedNovel.chapters[selectedChapterIndex];
    if (!chapter) return <div className="p-20 text-center font-display text-slate-300 italic">Manuscript page missing...</div>;

    const wordCount = chapter.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
      <div className="h-full flex flex-col bg-[#fffaf5]">
        <header className="glass-panel border-b border-white/40 px-6 py-4 flex items-center justify-between shadow-sm z-40">
          <button onClick={() => setCurrentView('novel')} className="p-2.5 -ml-2.5 hover:bg-black/5 rounded-2xl transition-all active:scale-90 text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="text-center flex-1 mx-4 max-w-[200px]">
            <p className="text-[9px] font-black text-indigo-600/60 uppercase tracking-[0.2em] mb-0.5">Chapter {chapter.chapterNumber}</p>
            <h3 className="font-display font-black text-slate-900 truncate leading-tight tracking-tight">{chapter.title}</h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-900 leading-none">{wordCount} WORDS</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{readingTime} MIN READ</span>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar paper-texture px-8 py-16 md:px-20 scroll-smooth">
          <article className="max-w-prose mx-auto">
            <div className="mb-16 flex flex-col items-center opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20" /></svg>
              <div className="h-px w-24 bg-current mt-4" />
            </div>

            <div className="font-serif prose-book text-[1.15rem] leading-[1.8] text-slate-800 space-y-0 selection:bg-indigo-100">
              {chapter.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-justify">{para}</p>
              ))}
            </div>

            <div className="mt-32 pb-20 flex flex-col items-center opacity-10">
              <div className="h-px w-32 bg-current mb-4" />
              <p className="font-display italic text-2xl tracking-widest uppercase">The End</p>
            </div>
          </article>
        </div>

        <div className="p-6 glass-panel border-t border-white/40 shadow-2xl z-40">
          <div className="max-w-prose mx-auto space-y-4">
            {chapter.status !== 'completed' && (
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Whisper a revision... (e.g. 'Add more tension')"
                    className="w-full pl-6 pr-16 py-5 rounded-[2rem] bg-white border-2 border-slate-100 shadow-xl shadow-slate-900/5 outline-none focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500/50 transition-all font-bold text-sm"
                    value={instructionText}
                    onChange={(e) => setInstructionText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && instructionText.trim()) {
                        handleWriteChapter(selectedChapterIndex, instructionText);
                      }
                    }}
                  />
                  <button
                    onClick={() => instructionText.trim() && handleWriteChapter(selectedChapterIndex, instructionText)}
                    disabled={isGenerating || !instructionText.trim()}
                    className="absolute right-2.5 top-2.5 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                  </button>
                </div>
                <button
                  onClick={() => { if (window.confirm("Once sealed, this chapter cannot be re-weaved. Continue?")) markChapterComplete(selectedChapterIndex); }}
                  className="px-8 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Seal Chapter
                </button>
              </div>
            )}

            {chapter.status === 'completed' && (
              <div className="py-2 text-center">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 py-3 rounded-2xl border border-emerald-100 italic">This manuscript page is sealed and preserved in history.</p>
              </div>
            )}

            {isGenerating && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Consulting the AI Muse</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderShelf = () => {
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsGenerating(true);
      try {
        const text = file.name.endsWith('.pdf')
          ? await extractTextFromPdf(file)
          : await file.text();

        const newRef: Reference = {
          id: Date.now().toString(),
          name: file.name,
          content: text,
          addedAt: Date.now()
        };
        setReferences([newRef, ...references]);
      } catch (err) {
        console.error(err);
        alert("The parchment was unreadable.");
      } finally {
        setIsGenerating(false);
      }
    };

    return (
      <div className="p-8 space-y-8 pb-32">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Reference Library</p>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight leading-none">The Shelf</h2>
          <p className="text-sm text-slate-500 font-medium max-w-[20ch]">Upload manuscripts to guide the AI Muse's prose.</p>
        </div>

        <div className="relative group">
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="border-4 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 group-hover:border-indigo-200 group-hover:bg-indigo-50/30 transition-all">
            <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Enshrine Metadata</p>
          </div>
        </div>

        <div className="space-y-4">
          {references.map(ref => (
            <div key={ref.id} className="p-6 bg-white rounded-[2rem] border-2 border-slate-50 shadow-sm flex items-center gap-4 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14.5 2 14.5 7 20 7" /></svg>
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-sm text-slate-900 truncate">{ref.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Reference Archive</p>
              </div>
              <button
                onClick={() => setReferences(prev => prev.filter(r => r.id !== ref.id))}
                className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const views: Record<View, () => React.ReactNode> = {
    home: renderHome,
    create: renderCreate,
    novel: renderNovelDetail,
    writer: renderWriter,
    shelf: renderShelf
  };

  const LoreModal = () => {
    const [fact, setFact] = useState(editingLoreIndex !== null ? (selectedNovel?.lorebook[editingLoreIndex] || '') : '');

    if (!isLoreModalOpen || !selectedNovel) return null;

    const saveLore = () => {
      const currentLore = selectedNovel.lorebook || [];
      const updated = editingLoreIndex !== null
        ? currentLore.map((f, i) => i === editingLoreIndex ? fact : f)
        : [fact, ...currentLore];

      setNovels(prev => prev.map(n => n.id === selectedNovel.id ? { ...n, lorebook: updated } : n));
      setIsLoreModalOpen(false);
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-1">Akashic Records</p>
              <h3 className="text-2xl font-display font-black text-slate-900">{editingLoreIndex !== null ? 'Modify Fact' : 'Record New Fact'}</h3>
            </div>
            <button onClick={() => setIsLoreModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-2xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div className="p-8 space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fact / Memory Context</label>
            <textarea
              autoFocus
              rows={5}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] px-6 py-5 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none resize-none leading-relaxed"
              placeholder="e.g. The protagonist discovered that the kingdom's silver is actually cursed, turning to dust in moonlight."
              value={fact}
              onChange={e => setFact(e.target.value)}
            />
          </div>

          <div className="p-8 border-t border-slate-100">
            <Button
              onClick={saveLore}
              disabled={!fact.trim()}
              className="w-full rounded-2xl h-14"
            >
              {editingLoreIndex !== null ? 'Enshrine Change' : 'Commit to Memory'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const CharacterModal = () => {
    const [char, setChar] = useState<Character>(editingCharacter || {
      id: Date.now().toString(),
      name: '',
      role: 'Supporting Character',
      archetype: '',
      description: '',
      personality: '',
      motivation: ''
    });

    if (!isCharacterModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-1">Dramatis Personae</p>
              <h3 className="text-2xl font-display font-black text-slate-900">{editingCharacter ? 'Refine Soul' : 'Birth New Character'}</h3>
            </div>
            <button onClick={() => setIsCharacterModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-2xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                <input type="text" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" value={char.name} onChange={e => setChar({ ...char, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Archetype</label>
                <input type="text" placeholder="e.g. The Mentor" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" value={char.archetype} onChange={e => setChar({ ...char, archetype: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role in Narrative</label>
              <input type="text" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" value={char.role} onChange={e => setChar({ ...char, role: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inner Motivation / Goal</label>
              <input type="text" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none" value={char.motivation} onChange={e => setChar({ ...char, motivation: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Personality Essence</label>
              <textarea rows={2} className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none resize-none" value={char.personality} onChange={e => setChar({ ...char, personality: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description & Backstory</label>
              <textarea rows={4} className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-4 py-3 font-bold text-sm focus:bg-white focus:border-indigo-100 transition-all outline-none resize-none" value={char.description} onChange={e => setChar({ ...char, description: e.target.value })} />
            </div>
          </div>

          <div className="p-8 border-t border-slate-100 flex gap-4">
            {editingCharacter && (
              <button
                onClick={() => deleteCharacter(char.id)}
                className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
              </button>
            )}
            <Button
              onClick={() => saveCharacter(char)}
              disabled={!char.name || !char.description}
              className="flex-1 rounded-2xl h-14"
            >
              {editingCharacter ? 'Update Manifestation' : 'Bind to Story'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 py-3 flex justify-around items-center z-50 max-w-md mx-auto rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <button
        onClick={() => { setCurrentView('home'); setSelectedNovelId(null); }}
        className={`flex flex-col items-center gap-1 transition-all ${currentView === 'home' || currentView === 'novel' ? 'text-indigo-600 scale-110' : 'text-slate-400 opacity-60'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        <span className="text-[10px] font-black uppercase tracking-tighter">Library</span>
      </button>

      <button
        onClick={() => setCurrentView('create')}
        className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] -mt-10 shadow-xl shadow-indigo-600/30 flex items-center justify-center text-white transition-all active:scale-90 hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
      </button>

      <button
        onClick={() => setCurrentView('shelf')}
        className={`flex flex-col items-center gap-1 transition-all ${currentView === 'shelf' ? 'text-indigo-600 scale-110' : 'text-slate-400 opacity-60'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
        <span className="text-[10px] font-black uppercase tracking-tighter">The Shelf</span>
      </button>
    </nav>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 shadow-2xl relative flex flex-col">
      {currentView !== 'writer' && (
        <Header
          onBack={currentView !== 'home' && currentView !== 'shelf' && currentView !== 'settings' ? () => {
            if (currentView === 'novel') { setSelectedNovelId(null); setCurrentView('home'); }
            else setCurrentView('home');
          } : undefined}
          onHome={() => { setSelectedNovelId(null); setCurrentView('home'); }}
          title={currentView === 'home' ? 'Library' : currentView === 'create' ? 'Inception' : currentView === 'shelf' ? 'The Shelf' : currentView === 'settings' ? 'Config' : 'Manuscript'}
          subtitle={currentView === 'home' ? 'Your Sanctuary' : currentView === 'novel' ? selectedNovel?.title : currentView === 'settings' ? 'System' : currentView === 'shelf' ? 'Reference Materials' : undefined}
          isOnline={isOnline}
          actions={
            <>
              {currentView === 'home' && (
                <button
                  onClick={() => setCurrentView('settings')}
                  className="w-10 h-10 rounded-2xl bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm border border-slate-100 flex items-center justify-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                </button>
              )}
              {currentView === 'novel' && (
                <button
                  onClick={handleExportPdf}
                  className="p-3 bg-white text-indigo-600 rounded-2xl shadow-sm border border-indigo-100 hover:scale-110 active:scale-95 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                </button>
              )}
            </>
          }
        />
      )}
      <main className={`flex-1 overflow-y-auto no-scrollbar ${currentView !== 'writer' ? 'pb-32' : ''}`}>
        {currentView === 'home' && renderHome()}
        {currentView === 'create' && renderCreate()}
        {currentView === 'novel' && renderNovelDetail()}
        {currentView === 'writer' && renderWriter()}
        {currentView === 'shelf' && renderShelf()}
        {currentView === 'settings' && <Settings />}
      </main>

      {currentView !== 'writer' && <BottomNav />}
      <CharacterModal />
      <LoreModal />
      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-8 text-center">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl space-y-6 max-w-xs w-full transform animate-in fade-in zoom-in duration-300">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-display font-black text-xl text-slate-900 ink-loading tracking-tight">Drafting Manuscript...</p>
              <p className="text-slate-400 text-sm leading-relaxed">The AI is composing original prose. This may take 15-30 seconds.</p>
            </div>
            <div className="flex gap-1 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
