import React, { useState, useMemo } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { SUPPORTED_FONTS, FONT_CATEGORIES, getFontsByCategory } from '../constants/fonts';
import { READING_TEMPLATES, TEMPLATE_CATEGORIES, getTemplatesByCategory } from '../constants/templates';

const Settings: React.FC = () => {
    const { settings, updateSettings, resetSettings, effectiveTheme } = useSettings();
    const [fontSearch, setFontSearch] = useState('');
    const [selectedFontCategory, setSelectedFontCategory] = useState<string | null>(null);
    const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string | null>(null);

    // Load ALL fonts for preview when Settings page is active
    React.useEffect(() => {
        const linkId = 'settings-font-preview-loader';
        if (document.getElementById(linkId)) return;

        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';

        // Construct URL for all fonts (weight 400 only for preview efficiency)
        const families = SUPPORTED_FONTS.map(f => {
            const cleanName = f.urlParam.split(':')[0];
            return `family=${cleanName}:wght@400`;
        }).join('&');

        link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
        document.head.appendChild(link);

        return () => {
            const el = document.getElementById(linkId);
            if (el) document.head.removeChild(el);
        };
    }, []);

    // Filter fonts based on search and category
    const filteredFonts = useMemo(() => {
        let fonts = SUPPORTED_FONTS;
        
        if (selectedFontCategory) {
            fonts = fonts.filter(f => f.category === selectedFontCategory);
        }
        
        if (fontSearch) {
            fonts = fonts.filter(f => 
                f.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
                f.description?.toLowerCase().includes(fontSearch.toLowerCase())
            );
        }
        
        return fonts;
    }, [fontSearch, selectedFontCategory]);

    // Filter templates based on category
    const filteredTemplates = useMemo(() => {
        if (selectedTemplateCategory) {
            return READING_TEMPLATES.filter(t => t.category === selectedTemplateCategory);
        }
        return READING_TEMPLATES;
    }, [selectedTemplateCategory]);

    return (
        <div className="pb-32 animate-fade-in">
            <div className="p-8 space-y-12 max-w-6xl mx-auto">
                {/* Header */}
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em]">Personalize</p>
                    <h2 className="text-4xl font-display font-black text-slate-900 dark:text-slate-100 tracking-tight">Reading Experience</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Craft your perfect environment for immersion.</p>
                </div>

                {/* Theme Mode */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">App Theme</h3>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 px-3 py-1 bg-indigo-50 dark:bg-indigo-950 rounded-full">
                            Currently: {effectiveTheme}
                        </span>
                    </div>
                    <div className="flex gap-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700">
                        {(['light', 'system', 'dark'] as const).map(mode => (
                            <button
                                key={mode}
                                onClick={() => updateSettings({ themeMode: mode })}
                                className={`flex-1 py-4 rounded-3xl text-xs font-black uppercase tracking-wider transition-all transform hover:scale-105 ${
                                    settings.themeMode === mode 
                                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-lg scale-[1.02]' 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                            >
                                {mode === 'light' && '☀️ '}
                                {mode === 'system' && '💻 '}
                                {mode === 'dark' && '🌙 '}
                                {mode}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-6">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Typography ({SUPPORTED_FONTS.length} Fonts)
                        </h3>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{settings.fontFamily}</span>
                    </div>

                    {/* Font Search */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search fonts by name or description..."
                            className="w-full bg-slate-100/50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-slate-200"
                            value={fontSearch}
                            onChange={e => setFontSearch(e.target.value)}
                        />
                    </div>

                    {/* Font Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedFontCategory(null)}
                            className={`py-2 px-4 rounded-xl text-xs font-black transition-all ${
                                selectedFontCategory === null
                                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            All Categories
                        </button>
                        {Object.entries(FONT_CATEGORIES).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedFontCategory(key)}
                                className={`py-2 px-4 rounded-xl text-xs font-black transition-all ${
                                    selectedFontCategory === key
                                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Font Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredFonts.map((font) => (
                            <button
                                key={font.name}
                                onClick={() => updateSettings({ fontFamily: font.name })}
                                className={`group relative p-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 ${
                                    settings.fontFamily === font.name 
                                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100 shadow-xl scale-105' 
                                        : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-600 shadow-sm'
                                }`}
                                title={font.description}
                            >
                                <span className="text-4xl" style={{ fontFamily: font.family }}>Ag</span>
                                <div className="text-center space-y-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider block">{font.name}</span>
                                    <span className="text-[9px] opacity-60 block">{font.category}</span>
                                </div>
                                {settings.fontFamily === font.name && (
                                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Typography Sliders */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-2 border-slate-50 dark:border-slate-700 shadow-sm space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Font Size</label>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{settings.fontSize}px</span>
                            </div>
                            <input
                                type="range"
                                min="12"
                                max="32"
                                step="1"
                                value={settings.fontSize}
                                onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Line Height</label>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{settings.lineHeight}x</span>
                            </div>
                            <input
                                type="range"
                                min="1.0"
                                max="2.5"
                                step="0.1"
                                value={settings.lineHeight}
                                onChange={(e) => updateSettings({ lineHeight: Number(e.target.value) })}
                                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Font Weight</label>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{settings.fontWeight}</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="900"
                                step="100"
                                value={settings.fontWeight}
                                onChange={(e) => updateSettings({ fontWeight: Number(e.target.value) })}
                                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Reading Templates */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Reading Environments ({READING_TEMPLATES.length})
                        </h3>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{settings.readingTemplateId}</span>
                    </div>

                    {/* Template Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTemplateCategory(null)}
                            className={`py-2 px-4 rounded-xl text-xs font-black transition-all ${
                                selectedTemplateCategory === null
                                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            All Environments
                        </button>
                        {Object.entries(TEMPLATE_CATEGORIES).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedTemplateCategory(key)}
                                className={`py-2 px-4 rounded-xl text-xs font-black transition-all ${
                                    selectedTemplateCategory === key
                                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => updateSettings({ readingTemplateId: template.id })}
                                className={`group relative h-32 rounded-2xl border-2 overflow-hidden transition-all transform hover:scale-105 ${
                                    settings.readingTemplateId === template.id 
                                        ? 'border-indigo-600 dark:border-indigo-400 shadow-xl scale-[1.02] ring-2 ring-indigo-200 dark:ring-indigo-800' 
                                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
                                }`}
                                title={template.description}
                            >
                                <div
                                    className={`absolute inset-0 ${template.bgClass} ${template.textClass} flex items-center justify-center p-4`}
                                    style={{
                                        backgroundImage: template.bgImage ? `url(${template.bgImage})` : template.bgGradient,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <span className="font-bold text-xs text-center leading-tight z-10 drop-shadow-lg">
                                        {template.name}
                                    </span>
                                </div>
                                {settings.readingTemplateId === template.id && (
                                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white z-20 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Preview Section */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Live Preview</h3>
                    <div 
                        className={`p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden`}
                        style={{
                            fontFamily: settings.fontFamily,
                            fontSize: `${settings.fontSize}px`,
                            lineHeight: settings.lineHeight,
                            fontWeight: settings.fontWeight,
                        }}
                    >
                        <p className="text-slate-700 dark:text-slate-300">
                            The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 mt-4">
                            "There is no greater agony than bearing an untold story inside you." — Maya Angelou
                        </p>
                    </div>
                </section>

                {/* Reset Button */}
                <section className="pt-8 border-t border-slate-100 dark:border-slate-700">
                    <button 
                        onClick={resetSettings} 
                        className="w-full py-4 text-xs font-black text-rose-500 dark:text-rose-400 uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-950 rounded-2xl transition-all transform hover:scale-105"
                    >
                        🔄 Reset to Defaults
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Settings;
