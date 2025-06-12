'use client';

import React from 'react';
import { useMode } from '../../context/ModeContext';
import AdminPage from './admin-page';
import DefaultPage from './default-page';
import UserPage from './user-page';

export default function Page() {
    const { mode } = useMode();

    if (mode === 'default') {
        return <DefaultPage />;
    }

    if (mode === 'admin') {
        return <AdminPage />;
    }

    return <UserPage />;
}
