'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const ModeContext = createContext(undefined);

export const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState('default');

    const handleSetPassword = async (password) => {
        try {
            const response = await fetch('/api/password-check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const { mode: modeResponse } = await response.json();
        
            if (modeResponse === 'admin') {
                setMode('admin');
            } else if (modeResponse === 'user') {
                setMode('user');
            } else {
                throw new Error('Invalid password');
            }
        } catch (error) {
            alert(error.message);
        }        
    };

    return (
        <ModeContext.Provider
            value={{
                mode,
                setPassword: handleSetPassword
            }}
        >
            {children}
        </ModeContext.Provider>
    );
};

export function useMode() {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
}

export default ModeContext;
