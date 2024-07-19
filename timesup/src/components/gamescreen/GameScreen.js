import React, { useState, useEffect, useContext } from 'react';
import Chronometer from "../chronometre/Chronometer";
import WordDisplay from "../worddisplay/WordDisplay";
import WordsContext from '../context/wordsContext.js';
import './GameScreen.css';

export default function GameScreen({ team, onEndTurn,wordsForNextTurn }) {

    const initialsWords = useContext(WordsContext);

    // Ajouter un console.log pour vérifier les valeurs du contexte
    console.log('WordsContext:', initialsWords);

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
            setRemainingWords(words);
           
        }
    }, [wordsForNextTurn, words]);

     // Log the updated words and remainingWords
     useEffect(() => {
        console.log('Updated remainingWords:', remainingWords);
        console.log('Updated words:', words);
    }, [ remainingWords, words]);
    // Fonction appelée lorsqu'une réponse correcte est donnée.
    // Passe simplement au mot suivant et ajoute le mot à la liste des mots correctement trouvés.
    const handleCorrectClick = () => {
        setCorrectWords(prevCorrectWords => [...prevCorrectWords, words[currentWordIndex]]);

        const newWords = remainingWords.filter((_, index) => index !== currentWordIndex);
        setRemainingWords(newWords)
        

        // Ajouter 1 au score
        setScore(score + 1);
        nextWord();
        
    };

    
    // Fonction appelée lorsqu'une réponse incorrecte est donnée.
    // Passe simplement au mot suivant sans changer le score.


    const handleIncorrectClick = () => {  
        const currentWord = remainingWords[currentWordIndex];
    
        // Créer une nouvelle liste qui exclut le mot en cours
        const newWords = remainingWords.filter((_, index) => index !== currentWordIndex);
        
        // Ajouter le mot en cours à la fin de la nouvelle liste
        newWords.push(currentWord);
        
        // Mettre à jour l'état avec la nouvelle liste
        setRemainingWords(newWords);

        nextWord();
    };
 

     // Fonction pour passer au mot suivant.
    // Vérifie si l'index du mot actuel est inférieur à la longueur de 'words' moins 1.
    // Si c'est le cas, incrémente 'currentWordIndex'.
    // Sinon, termine le tour en appelant 'onEndTurn' avec le score actuel et les mots restants.
    const nextWord = () => {
        if (remainingWords.length === 0) {
            console.log('il ne reste plus de mots ');
            onEndTurn(score,remainingWords,correctWords);
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
                <Chronometer comptearebours={20} onTimeUp={handleTimeUp} />
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