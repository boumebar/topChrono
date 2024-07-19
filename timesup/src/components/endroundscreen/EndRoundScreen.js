import './EndRoundScreen.css';



export default function EndRoundScreen({ round, scores,onNextRound }) {

    console.log('le score est : ' + scores);

    return (
        <div className="end-round-screen">
            <h1>Manche {round}</h1>
            <p>Fin de manche </p>
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

            <button onClick={onNextRound}>Manche suivante</button>
        </div>
    );
}