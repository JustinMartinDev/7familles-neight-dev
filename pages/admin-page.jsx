import React, { useState, useEffect } from 'react';
import TirageCarte from 'components/TirageCarte';
import Statistiques from 'components/Statistiques';

export default function AdminPage() {
    const [cartes, setCartes] = useState([]);

    useEffect(() => {
        fetch('/api/get-cartes')
            .then(response => response.json())
            .then(data => setCartes(data.cartes));
    }, []);


    if(cartes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TirageCarte isAdmin={true} cartes={cartes} />
            <Statistiques />
        </>
    )
}
