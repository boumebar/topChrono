import { useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import StartScreen from './components/startscreen/StartScreen';
import GameScreen from './components/gamescreen/GameScreen';
import RoundInfoScreen from './components/roundinfoscreen/RoundInfoScreen';
import NextTeamScreen from './components/nextteamscreen/NextTeamScreen';
import EndRoundScreen from './components/endroundscreen/EndRoundScreen';
import NextRoundScreen from './components/nextroundscreen/NextRoundScreen';
import FinalScoreScreen from './components/finalscorescreen/FinalScoreScreen';

function App() {
  const [screen, setScreen] = useState('start');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [teamScores, setTeamScores] = useState([0, 0]);
  const [roundScores, setRoundScores] = useState([0, 0]);
  const [correctWords, setCorrectWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);

  const handleStart = () => setScreen('game');

  const handleValidateRound = () => setScreen('roundInfo');

 
  const handleNextTeam = () => setScreen('game');

 // Fonction pour gérer la fin d'un tour
  const handleEndTurn = (score,remainingWords, correctWords) => {
  
  
  console.log('cest la fin du tour ' + remainingWords + 'le score de lequipe est de ' + score);

  
  // Crée une copie des scores actuels de la manche
  const newScores = [...roundScores];
  // Ajoute le score du tour actuel au score de l'équipe actuelle
  newScores[currentTeam - 1] += score;
  // Met à jour les scores de la manche avec les nouveaux scores
  setRoundScores(newScores);

  // Met à jour les mots restants avec les mots incorrects
  setRemainingWords(remainingWords);

  if(remainingWords !== undefined){
    // Vérifie s'il ne reste plus de mots à jouer
    if (remainingWords.length === 0) {
      console.log('La partie est gagnee il reste ' + remainingWords);
      // Change l'écran pour indiquer la fin de la manche
      setScreen('roundInfo');
      // Met à jour les scores des équipes avec les scores de la manche actuelle
      setTeamScores(prevScores => [
          prevScores[0] + newScores[0],
          prevScores[1] + newScores[1]
    ]);
    } else { 
      console.log('La partie est perdue');
      // Change l'équipe actuelle (si c'était l'équipe 1, passe à l'équipe 2 et vice versa)
      setCurrentTeam(currentTeam === 1 ? 2 : 1);

      
      // Change l'écran pour afficher le score 
      setScreen('roundInfo');
    }
  }
  

    // Met à jour les mots correctement trouvés
    setCorrectWords(correctWords);

  };



  return (
    <div className="App">
       {screen === 'start' && <StartScreen onStart={handleStart}/>}
       {screen === 'game' && (
          <GameScreen
              team={currentTeam}
              onEndTurn={handleEndTurn}
              initialWords={remainingWords.length ? remainingWords : undefined}
          />
        )}
            {screen === 'roundInfo' && (
                <RoundInfoScreen
                    round={currentRound}
                    correctWordsLength = {correctWords.length}
                    scores={roundScores}
                    onValidateRound={handleValidateRound}
                    onNextTeam={handleNextTeam}
                />
            )}
            {screen === 'nextTeam' && (
                <NextTeamScreen
                    round={currentRound}
                    correctWordsLength = {correctWords.length}
                    onNextTeam={handleNextTeam}
                />
            )}
            {/* {screen === 'endRound' && (
                <EndRoundScreen
                    round={currentRound}
                    scores={teamScores}
                    onNextRound={handleNextRound}
                />
            )}
            {screen === 'nextRound' && (
                <NextRoundScreen
                    round={currentRound}
                    onNextTeam={handleNextTeam}
                />
            )}
            {screen === 'finalScore' && <FinalScoreScreen scores={teamScores} />} */}

    </div>
  );
}

export default App;
