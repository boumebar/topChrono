import React from 'react';
import './TeamTurn.css'

export default function TeamTurn({ score, onValidate }) {
    return (
        <div className="game-over-screen">
            <h1>Manche 1</h1>
            <p>{score} mot(s) trouvé(s)</p>
            <button className="validate" onClick={onValidate}>Valider</button>
        </div>
    );
}
