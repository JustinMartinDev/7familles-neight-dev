import React from 'react';
import TirageCarte from 'components/TirageCarte';
import Statistiques from 'components/Statistiques';

export default function AdminPage() {
    return (
        <>
            <TirageCarte isAdmin={true} />
            <Statistiques />
        </>
    )
}
