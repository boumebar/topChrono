import './Card.css';
import { useState, useEffect, useMemo } from 'react';
import Chronometre from '../chronometre/Chronometre';
import TeamTurn from '../teamTurn/TeamTurn';

export default function Card(props) {


    // Liste complète des mots islamiques
    const allIslamicWords = useMemo(() => [
        "Coran", "Mosquée", "Ramadan", "Prière", "Hajj", "Prophète", "Mecque", "Médine", "Ayat", "Shahada",
        "Zakat", "Halal", "Hadith", "Iftar", "Aïd", "Salat", "Imam", "Calife", "Fatwa", "Kaaba",
        "Jumu'ah", "Sounna", "Dua", "Barakah", "Fajr", "Hijab", "Sadaqah", "Fiqh", "Sharia", "Tawheed",
        "Oummah", "Imane", "Jannah", "Jahannam", "Wudu", "Sawm", "Ijtihad", "Qibla", "Tasbih", "Dhikr",
        "Madrasa", "Rakat", "Sujud", "Minaret", "Adhan", "Muadhin", "Taqwa", "Akhirah", "Jinn", "Juz",
        "Khutbah", "Ulema"
    ], []);

    // Sélectionner aléatoirement 30 mots de la liste complète
    const islamicWords = useMemo(() => {
        let shuffled = allIslamicWords.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 30);
    }, [allIslamicWords]);

    const [displayedWords, setDisplayedWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [remainingCards, setRemainingCards] = useState(islamicWords.length);
    const [gameOver, setGameOver] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);


    useEffect(() => {
        // Sélectionner un mot aléatoire au chargement du composant
        const randomIndex = Math.floor(Math.random() * islamicWords.length);
        setCurrentWordIndex(randomIndex);
    }, [islamicWords]);

    useEffect(() => {
        if (currentWordIndex !== null) {
            // Ajouter le mot actuellement affiché à la liste des mots affichés
            setDisplayedWords(prevDisplayedWords => [...prevDisplayedWords, islamicWords[currentWordIndex]]);
            // Décrémenter le nombre de cartes restantes
            setRemainingCards(prevRemainingCards => prevRemainingCards - 1);
        }
    }, [currentWordIndex, islamicWords]);

    const handleNewWord = () => {
        // Vérifier si tous les mots ont été affichés
        if (displayedWords.length === islamicWords.length) {
            // Tous les mots ont été affichés, arrêter le jeu

            setCurrentWordIndex(null);
            setGameOver(true);
            return;
        }

        // Choisir un mot aléatoire qui n'a pas encore été affiché
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * islamicWords.length);
        } while (displayedWords.includes(islamicWords[randomIndex]));

        setCurrentWordIndex(randomIndex);
    };

    const handleCorrectClick = () => {
        setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
        handleNewWord();
    };

    const handleIncorrectClick = () => {
        handleNewWord();
    };

    const handleValidate = () => {
        // Logique à exécuter lors de la validation (par exemple, passer à la manche suivante)
        console.log('Validation de la manche');
    };

    const handleTimeUp = () => {
        setGameOver(true);
    };

    return (
        <div className="card">
            {gameOver ? (
                <TeamTurn score={correctAnswers} onValidate={handleValidate} />
            ) : (
                <>
                    <Chronometre comptearebours={40} gameOver={gameOver} onTimeUp={handleTimeUp} />
                    <div className="question">
                        {currentWordIndex !== null ? islamicWords[currentWordIndex] : "Jeu terminé!"}
                        <div className="number">{remainingCards}</div>
                    </div>
                    <div className="score">
                        <button className="circle correct" onClick={handleCorrectClick} disabled={currentWordIndex === null}>
                            <span>&#10004;</span>
                        </button>
                        <button className="circle incorrect" onClick={handleIncorrectClick} disabled={currentWordIndex === null}>
                            <span>&#10006;</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}