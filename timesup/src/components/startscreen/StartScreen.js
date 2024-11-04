import './StartScreen.css';

export default function StartScreen({ onRules }) {
    return (
        <div className="card">
            <h1>Top chrono</h1>
            <button className="button" onClick={onRules}>C'est parti !</button>
        </div>
    );
}