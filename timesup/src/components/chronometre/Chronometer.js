import React, { useState, useEffect, useRef } from 'react';

export default function Chronometer({ comptearebours, onTimeUp }) {
    const [time, setTime] = useState(comptearebours);
    const timerIdRef = useRef(null);

    useEffect(() => {
        // Si le temps est supérieur à 0, démarre le compte à rebours.
        if (time > 0) {
            timerIdRef.current = setTimeout(() => setTime(time - 1), 1000);
        } else {
            // Si le temps est écoulé, appelle la fonction 'onTimeUp'.
            onTimeUp();
        }

        // Nettoie le timeout précédent pour éviter les multiples appels.
        return () => clearTimeout(timerIdRef.current);
    }, [time]);

    useEffect(() => {
        // Reset the timer when comptearebours changes
        setTime(comptearebours);
    }, [comptearebours]);

    return (
        <div className="chronometer">
            {time}''
        </div>
    );
}
