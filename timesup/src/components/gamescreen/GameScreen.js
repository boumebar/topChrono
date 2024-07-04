import Chronometre from "../chronometre/Chronometre";
export default function StartScreen() {
    return (   
        <div >
            <Chronometre comptearebours={40} gameOver={gameOver} onTimeUp={handleTimeUp} />
        </div>
    );
}