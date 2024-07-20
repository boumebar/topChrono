import './EndRoundScreen.css';



export default function EndRoundScreen({ round, scores,onNextRound,onRestart }) {

    const determineWinner = () => {
        if (scores[0] > scores[1]) {
            return 1;
        } else if (scores[1] > scores[0]) {
            return 2;
        } else {
            return null; // Égalité
        }
    };

    const winner = determineWinner();

    console.log('le score est : ' + scores);

    return (
        <div className="end-round-screen">
            <h1>{round === 3 ? 'Fin de partie' : 'Manche' + round}</h1>
            <p>{round === 3 ? (winner ? `L'équipe numéro ${winner} a gagné` : 'Égalité') : 'Fin de manche'}</p>
            <div className="score-table">
                <div className="score-column">
                    <p>Equipe 1</p>
                    <p className="score">{scores[0]}</p>
                </div>
                <div className="score-column">
                    <p>Equipe 2</p>
                    <p className="score">{scores[1]}</p>
                </div>
            </div>

            <button onClick={round === 3 ? onRestart : onNextRound}>
                {round === 3 ? 'Rejouer' : 'Manche suivante'}
            </button>
        </div>
    );
}