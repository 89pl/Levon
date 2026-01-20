import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
    effectiveTheme: 'light' | 'dark'; // The actual theme being displayed
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
        try {
            const saved = localStorage.getItem('levon-settings-v1');
            if (!saved) return DEFAULT_SETTINGS;

            const parsed = JSON.parse(saved);
            // Merge with defaults to handle any missing keys
            return parsed && typeof parsed === 'object' ? { ...DEFAULT_SETTINGS, ...parsed } : DEFAULT_SETTINGS;
        } catch (error) {
            console.warn('Failed to parse settings from localStorage:', error);
            return DEFAULT_SETTINGS;
        }
    });

    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

    // Persist settings to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('levon-settings-v1', JSON.stringify(settings));
        } catch (error) {
            console.warn('Failed to save settings to localStorage:', error);
        }
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

    // Handle system theme preference changes
    const handleSystemThemeChange = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
        if (settings.themeMode === 'system') {
            const isDark = e.matches;
            setEffectiveTheme(isDark ? 'dark' : 'light');
            const root = window.document.documentElement;
            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [settings.themeMode]);

    // Apply Theme Mode (Light/Dark) with proper system preference handling
    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const applyTheme = () => {
            let isDark = false;
            
            if (settings.themeMode === 'dark') {
                isDark = true;
            } else if (settings.themeMode === 'light') {
                isDark = false;
            } else { // system
                isDark = mediaQuery.matches;
            }

            setEffectiveTheme(isDark ? 'dark' : 'light');
            
            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        // Apply theme immediately
        applyTheme();

        // Listen for system theme changes
        if (settings.themeMode === 'system') {
            // Modern browsers
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleSystemThemeChange);
            } else {
                // Fallback for older browsers
                mediaQuery.addListener(handleSystemThemeChange);
            }
        }

        return () => {
            if (settings.themeMode === 'system') {
                if (mediaQuery.removeEventListener) {
                    mediaQuery.removeEventListener('change', handleSystemThemeChange);
                } else {
                    mediaQuery.removeListener(handleSystemThemeChange);
                }
            }
        };
    }, [settings.themeMode, handleSystemThemeChange]);

    const updateSettings = useCallback((updates: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...updates }));
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(DEFAULT_SETTINGS);
        // Force theme re-application
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const isDark = mediaQuery.matches;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        setEffectiveTheme(isDark ? 'dark' : 'light');
    }, []);

    const currentTemplate = READING_TEMPLATES.find(t => t.id === settings.readingTemplateId) || READING_TEMPLATES[0];
    const currentFont = SUPPORTED_FONTS.find(f => f.name === settings.fontFamily) || SUPPORTED_FONTS[0];

    return (
        <SettingsContext.Provider 
            value={{ 
                settings, 
                updateSettings, 
                resetSettings, 
                currentTemplate, 
                currentFont,
                effectiveTheme
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
