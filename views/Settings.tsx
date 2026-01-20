import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { SUPPORTED_FONTS } from '../constants/fonts';
import { READING_TEMPLATES } from '../constants/templates';

const Settings: React.FC = () => {
    const { settings, updateSettings, resetSettings } = useSettings();

    // Load ALL fonts for preview when Settings page is active
    // We strip weights/styles to keep the request size manageable for previews
    React.useEffect(() => {
        const linkId = 'settings-font-preview-loader';
        if (document.getElementById(linkId)) return;

        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';

        // Construct URL for all fonts (weight 400 only for preview efficiency)
        const families = SUPPORTED_FONTS.map(f => {
            // Extract family name only, e.g., "Lora" from "Lora:ital,wght..."
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

    return (
        <div className="pb-32 animate-fade-in">
            <div className="p-8 space-y-12">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em]">Personalize</p>
                    <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight">Reading Experience</h2>
                    <p className="text-slate-500 text-sm font-medium">Craft your perfect environment for immersion.</p>
                </div>

                {/* Theme Mode */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">App Theme</h3>
                    <div className="flex gap-4 p-2 bg-slate-100 rounded-[2rem] border border-slate-200">
                        {(['light', 'system', 'dark'] as const).map(mode => (
                            <button
                                key={mode}
                                onClick={() => updateSettings({ themeMode: mode })}
                                className={`flex-1 py-4 rounded-3xl text-xs font-black uppercase tracking-wider transition-all ${settings.themeMode === mode ? 'bg-white text-indigo-600 shadow-lg scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-6">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typography ({SUPPORTED_FONTS.length} Fonts)</h3>
                        <span className="text-[10px] font-bold text-indigo-600">{settings.fontFamily}</span>
                    </div>

                    <div className="flex overflow-x-auto gap-4 pb-6 -mx-8 px-8 no-scrollbar snap-x">
                        {SUPPORTED_FONTS.map((font) => (
                            <button
                                key={font.name}
                                onClick={() => updateSettings({ fontFamily: font.name })}
                                className={`snap-center flex-shrink-0 w-40 h-32 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${settings.fontFamily === font.name ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xl scale-105' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:scale-105'}`}
                            >
                                <span className="text-3xl" style={{ fontFamily: font.family }}>Ag</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{font.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Sliders */}
                    <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</label>
                                <span className="text-xs font-bold text-slate-900">{settings.fontSize}px</span>
                            </div>
                            <input
                                type="range"
                                min="12"
                                max="32"
                                step="1"
                                value={settings.fontSize}
                                onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Line Height</label>
                                <span className="text-xs font-bold text-slate-900">{settings.lineHeight}x</span>
                            </div>
                            <input
                                type="range"
                                min="1.0"
                                max="2.5"
                                step="0.1"
                                value={settings.lineHeight}
                                onChange={(e) => updateSettings({ lineHeight: Number(e.target.value) })}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weight</label>
                                <span className="text-xs font-bold text-slate-900">{settings.fontWeight}</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="900"
                                step="100"
                                value={settings.fontWeight}
                                onChange={(e) => updateSettings({ fontWeight: Number(e.target.value) })}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Templates */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Environments ({READING_TEMPLATES.length})</h3>
                        <span className="text-[10px] font-bold text-indigo-600">{settings.readingTemplateId}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {READING_TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => updateSettings({ readingTemplateId: template.id })}
                                className={`relative h-24 rounded-2xl border-2 overflow-hidden transition-all ${settings.readingTemplateId === template.id ? 'border-indigo-600 shadow-xl scale-[1.02] ring-2 ring-indigo-200' : 'border-transparent hover:scale-[1.02] shadow-sm'}`}
                            >
                                <div
                                    className={`absolute inset-0 ${template.bgClass} ${template.textClass} flex items-center justify-center p-4`}
                                    style={{
                                        backgroundImage: template.bgImage ? `url(${template.bgImage})` : template.bgGradient,
                                        backgroundColor: !template.bgImage && !template.bgGradient ? undefined : 'transparent' // Fallback
                                    }}
                                >
                                    <span className="font-bold text-xs text-center leading-tight z-10">{template.name}</span>
                                </div>
                                {/* Selected Tick */}
                                {settings.readingTemplateId === template.id && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white z-20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="pt-8 border-t border-slate-100">
                    <button onClick={resetSettings} className="w-full py-4 text-xs font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all">
                        Reset to Defaults
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Settings;
