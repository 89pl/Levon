import React, { ReactNode, useState, useEffect } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

// Functional Error Boundary using React Error Boundary hooks pattern
const ErrorBoundary: React.FC<Props> = ({ children, fallback, name }) => {
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Capture unhandled errors
        const errorHandler = (event: ErrorEvent) => {
            setError(event.error);
        };

        window.addEventListener('error', errorHandler);
        return () => window.removeEventListener('error', errorHandler);
    }, []);

    if (error) {
        const errorFallback = fallback || (
            <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Something went wrong.</h2>
                <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
                    We encountered an error loading the {name || 'component'}.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-xl text-left overflow-x-auto text-xs font-mono shadow-inner">
                    {error.message}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all mt-6"
                >
                    Reload Application
                </button>
            </div>
        );

        return errorFallback;
    }

    return children;
};

export { ErrorBoundary };
