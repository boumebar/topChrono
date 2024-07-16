export default function RoundInfoScreen({ round,correctWordsLength, scores, onNextTeam }) {
    return (
        <div className="round-info-screen">
            <h1>Manche {round}</h1>
            <p>{correctWordsLength} mot(s) correct(s)</p>
            <button onClick={onNextTeam}>Valider</button>
        </div>
    );
}