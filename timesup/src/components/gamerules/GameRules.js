import './GameRules.css';

export default function GameRules({round, currentTeam, onStart, onRestart}) {
    return (
        <div className="game-rules">
            <h1>Manche { round }</h1>
            <h2>{round === 1 ? "Décrivez" : round === 2 ? "Un seul mot" : "Mimez"}</h2>
            <p >{round === 1 ? "Vous devez décrire les mots. Vous ne pouvez pas prononcer des mots de la meme famille ou qui sonnent pareil. Vous ne pouvez pas traduire les mots ou les epeler. Vous pouvez passer les mots en touchant la croix." : round === 2 ? "Vous ne pouvez prononcer qu'un seul mot.Votre équipe ne peut faire qu'une seul proposition par carte. Vous pouvez passer les cartes qui ne vous conviennent pas." : "Vous devez mimer le mot. Vous pouvez faire des bruitages.Vous ne pouvez pas parler "}</p>
            <button onClick={onStart }>Equipe {currentTeam} commence </button>
        </div>
        
    );
}