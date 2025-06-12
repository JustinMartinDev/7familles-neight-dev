"use client";

import React, { useState, useEffect } from 'react';
import TirageCarte from 'components/TirageCarte';

export default function UserPage() {
    const [cartes, setCartes] = useState([]);

    useEffect(() => {
        fetch('/api/get-cartes')
            .then(response => response.json())
            .then(data => setCartes(data));
    }, []);


    if(cartes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TirageCarte isAdmin={false} cartes={cartes} />
        </>
    )
}
