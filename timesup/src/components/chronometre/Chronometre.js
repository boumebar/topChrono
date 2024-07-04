import { useState, useEffect } from 'react';
import './Chronometre.css';

export default function Chronometre({ comptearebours, gameOver,onTimeUp }) {
    const [countdown, setCountdown] = useState(comptearebours);

    useEffect(() => {
        if (gameOver) {
            return; // Si le jeu est terminé, ne pas démarrer le chronomètre
        }

        const interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(prevCountdown => prevCountdown - 1);
            } else {
                onTimeUp(); // Appelle la fonction onTimeUp passée en prop
                clearInterval(interval); // Arrête le timer lorsque countdown atteint 0
            }
        }, 1000);

        // Nettoyage du timer lorsque le composant est démonté ou si le jeu est terminé
        return () => clearInterval(interval);
    }, [countdown, gameOver, onTimeUp]);

    useEffect(() => {
        // Réinitialiser le compte à rebours lorsque le jeu est redémarré
        if (!gameOver) {
            setCountdown(comptearebours);
        }
    }, [comptearebours, gameOver]);

    return (
        <div className="time">
            {countdown}"
        </div>
    );
}
