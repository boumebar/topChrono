export default function NextRoundScreen({ round, score,onNextRound }) {
    return (
        <div className="next-round-screen">
            <h1>Manche {round}</h1>
            <p>Fin de manche </p>
            <button onClick={onNextRound}>Manche suivante</button>
        </div>
    );
}