'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext(undefined);

const LOCAL_STORAGE_KEY = '7_FAMILLE_GAME_NEIGHT_MODE';

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('default');

  useEffect(() => {
    const mode = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (mode) {
      setMode(mode);
    }
  }, []);

  const disconnect = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setMode('default');
  };

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
        localStorage.setItem(LOCAL_STORAGE_KEY, 'admin');
        setMode('admin');
      } else if (modeResponse === 'user') {
        localStorage.setItem(LOCAL_STORAGE_KEY, 'user');
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
        setPassword: handleSetPassword,
        disconnect
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
