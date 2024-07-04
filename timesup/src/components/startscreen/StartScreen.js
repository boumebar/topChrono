import './StartScreen.css';

export default function StartScreen({ onStart }) {
    return (
        <div className="card">
            <h1>Times Up</h1>
            <button className="button" onClick={onStart}>C'est parti !</button>
        </div>
    );
}