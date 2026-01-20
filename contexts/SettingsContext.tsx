import React, { createContext, useContext, useEffect, useState } from 'react';
import { SUPPORTED_FONTS } from '../constants/fonts';
import { READING_TEMPLATES } from '../constants/templates';

interface Settings {
    themeMode: 'light' | 'dark' | 'system';
    fontFamily: string;
    fontSize: number; // in px
    lineHeight: number; // relative (e.g. 1.6)
    fontWeight: number; // 300, 400, 700...
    readingTemplateId: string;
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
    resetSettings: () => void;
    currentTemplate: typeof READING_TEMPLATES[0];
    currentFont: typeof SUPPORTED_FONTS[0];
}

const DEFAULT_SETTINGS: Settings = {
    themeMode: 'system',
    fontFamily: 'Lora',
    fontSize: 18,
    lineHeight: 1.8,
    fontWeight: 400,
    readingTemplateId: 'soft-ivory'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('levon-settings-v1');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    // Persist settings
    useEffect(() => {
        localStorage.setItem('levon-settings-v1', JSON.stringify(settings));
    }, [settings]);

    // Dynamic Font Loading
    useEffect(() => {
        const fontConfig = SUPPORTED_FONTS.find(f => f.name === settings.fontFamily);
        if (fontConfig) {
            const linkId = 'dynamic-font-loader';
            let link = document.getElementById(linkId) as HTMLLinkElement;

            if (!link) {
                link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }

            link.href = `https://fonts.googleapis.com/css2?family=${fontConfig.urlParam}&display=swap`;
        }
    }, [settings.fontFamily]);

    // Apply Theme Mode (Light/Dark)
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
            settings.themeMode === 'dark' ||
            (settings.themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [settings.themeMode]);

    const updateSettings = (updates: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...updates }));
    };

    const resetSettings = () => setSettings(DEFAULT_SETTINGS);

    const currentTemplate = READING_TEMPLATES.find(t => t.id === settings.readingTemplateId) || READING_TEMPLATES[0];
    const currentFont = SUPPORTED_FONTS.find(f => f.name === settings.fontFamily) || SUPPORTED_FONTS[0];

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, currentTemplate, currentFont }}>
            {children}
        </SettingsContext.Provider>
    );
};
