'use client';

import React from 'react';
import { useMode } from '../../context/ModeContext';
import AdminPage from './admin-page';
import DefaultPage from './default-page';
import UserPage from './user-page';

export default function Page() {
  const { mode, disconnect } = useMode();

  if (mode === 'default') {
    return <DefaultPage />;
  }

  return (
    <div>
      <h2>Connected as {mode}</h2>
      <button className="btn btn-primary" onClick={() => disconnect()}>
        Disconnect
      </button>
      {mode === 'admin' ? <AdminPage /> : <UserPage />}
    </div>
  );

}
