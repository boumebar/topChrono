import React, { useState, useEffect, useContext } from 'react';
import Chronometer from "../chronometre/Chronometer";
import WordDisplay from "../worddisplay/WordDisplay";
import WordsContext from '../context/wordsContext.js';
import './GameScreen.css';

export default function GameScreen({ round, team, onEndTurn,wordsForNextTurn }) {


    const initialsWords = useContext(WordsContext);

   // Initialise l'état 'words' comme un tableau vide. 
    // Cet état contiendra la liste des mots à utiliser pendant le jeu.
    const [words, setWords] = useState(initialsWords);

    // Initialise l'état 'currentWordIndex' à 0. 
    // Cet état maintient l'index du mot actuellement en cours d'utilisation dans le tableau 'words'.
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Initialise l'état 'score' à 0. 
    // Cet état garde la trace du score actuel de l'utilisateur ou de l'équipe.
    const [score, setScore] = useState(0);
    const [correctWords, setCorrectWords] = useState([]);
    const [remainingWords, setRemainingWords] = useState([]);

    
   // useEffect est utilisé pour initialiser l'état 'words' lorsque 'allIslamicWords' change.
    // 'allIslamicWords.sort(() => 0.5 - Math.random())' mélange les mots de manière aléatoire.
    // 'slice(0, 30)' prend les 30 premiers mots du tableau mélangé.
    useEffect(() => {
        if (wordsForNextTurn) {
            setWords(wordsForNextTurn);
            setRemainingWords(wordsForNextTurn);
        } else {
            const shuffledWords = words.sort(() => Math.random() - 0.5);
            setRemainingWords(shuffledWords);
          
        }
    }, [wordsForNextTurn, words]);

     // Log the updated words and remainingWords
     useEffect(() => {
    }, [ remainingWords, words]);
    // Fonction appelée lorsqu'une réponse correcte est donnée.
    // Passe simplement au mot suivant et ajoute le mot à la liste des mots correctement trouvés.
    const handleCorrectClick = () => {
        const newCorrectWords = [...correctWords, remainingWords[currentWordIndex]];
        const newRemainingWords = remainingWords.filter((_, index) => index !== currentWordIndex);

        setCorrectWords(newCorrectWords);
        setRemainingWords(newRemainingWords);

        setScore(prevScore => {
            const newScore = prevScore + 1;

            if (newRemainingWords.length === 0) {
                onEndTurn(newScore, newRemainingWords, newCorrectWords);
            } else {
                setCurrentWordIndex(0); // Always reset to 0 for simplicity
            }

            return newScore;
        });
    };

    const handleIncorrectClick = () => {
        const currentWord = remainingWords[currentWordIndex];
        const newRemainingWords = remainingWords.filter((_, index) => index !== currentWordIndex);
        newRemainingWords.push(currentWord);

        setRemainingWords(newRemainingWords);

        if (newRemainingWords.length === 0) {
            console.log('il ne reste plus de mots');
            onEndTurn(score, newRemainingWords, correctWords);
        } else {
            setCurrentWordIndex(0); // Always reset to 0 for simplicity
        }
    };

    // Fonction appelée lorsque le temps est écoulé.
    // Termine le tour en appelant 'onEndTurn' avec le score actuel et les mots restants.
    const handleTimeUp = () => {
        onEndTurn(score,remainingWords,correctWords);
    };


    return (   
        <div className='game'>
            <h1>
                <Chronometer comptearebours={40} onTimeUp={handleTimeUp} />
            </h1>
            <div className='word'>
                <WordDisplay word={remainingWords[currentWordIndex]}
                    />
                <div className="number">{remainingWords.length}</div>
            </div>
            <div className="score">
                <button className="circle correct" onClick={handleCorrectClick} disabled={currentWordIndex === null}>
                    <span>&#10004;</span>
                </button>
                <button className="circle incorrect" onClick={handleIncorrectClick} disabled={currentWordIndex === null}>
                    <span>&#10006;</span>
                </button>
            </div>
        </div>
    );
}