import React, { useState, useEffect } from 'react';

export default function Chronometer({ comptearebours, onTimeUp }) {// Initialise l'état 'time' avec la valeur initiale 'comptearebours'.
    // Cet état maintient le temps restant pour le compte à rebours.
    const [time, setTime] = useState(comptearebours);
    
    useEffect(() => {
        // Vérifie si le temps restant est supérieur à 0.
        if (time > 0) {
            // Définit un timeout qui décrémente le temps de 1 seconde (1000 ms) après une seconde.
            const timerId = setTimeout(() => setTime(time - 1), 1000);
    
            // Nettoie le timeout précédent pour éviter les multiples appels lorsque 'time' change.
            return () => clearTimeout(timerId);
        } else {
            // Si le temps est écoulé (time <= 0), appelle la fonction 'onTimeUp'.
            onTimeUp();
        }
        // Le useEffect dépend des variables 'time' et 'onTimeUp'.
        // Il s'exécute à chaque changement de 'time' ou 'onTimeUp'.
    }, [time, onTimeUp]);
    

    return (
        <div className="chronometer">
            {time}''
        </div>
    );
}