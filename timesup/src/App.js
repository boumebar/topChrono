import { useState ,useMemo} from 'react';
import './App.css';
import Card from './components/card/Card';
import StartScreen from './components/startscreen/StartScreen';
import GameScreen from './components/gamescreen/GameScreen';
import RoundInfoScreen from './components/roundinfoscreen/RoundInfoScreen';
import NextTeamScreen from './components/nextteamscreen/NextTeamScreen';
import EndRoundScreen from './components/endroundscreen/EndRoundScreen';
import NextRoundScreen from './components/nextroundscreen/NextRoundScreen';
import FinalScoreScreen from './components/finalscorescreen/FinalScoreScreen';

import WordsContext from './components/context/wordsContext';

function App() {

  const wordsList = useMemo(() => [
    "Coran", "Mosquée", "Ramadan", "Prière", "Hajj", "Prophète", "Mecque", "Médine", "Ayat", "Shahada",
    "Zakat", "Halal", "Hadith", "Iftar", "Aïd", "Salat", "Imam", "Calife", "Fatwa", "Kaaba",
    "Jumu'ah", "Sounna", "Dua", "Barakah", "Fajr", "Hijab", "Sadaqah", "Fiqh", "Sharia", "Tawheed",
    "Oummah", "Imane", "Jannah", "Jahannam", "Wudu", "Sawm", "Ijtihad", "Qibla", "Tasbih", "Dhikr",
    "Madrasa", "Rakat", "Sujud", "Minaret", "Adhan", "Muadhin", "Taqwa", "Akhirah", "Jinn", "Juz",
    "Khutbah", "Ulema"
], []);


  const initialWords = useMemo(() => {
    return wordsList.sort(() => 0.5 - Math.random()).slice(0, 30);
  }, [wordsList]);
  const [screen, setScreen] = useState('start');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [teamScores, setTeamScores] = useState([0, 0]);
  const [roundScores, setRoundScores] = useState([0, 0]);
  const [correctWords, setCorrectWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);

  const handleStart = () => setScreen('game');

  const handleValidateRound = () => setScreen('roundInfo');

 
  const handleNextTeam = () => setScreen('nextTeam');

  const handleNextRound = () => {
    console.log(teamScores);
    setCurrentRound(currentRound + 1);
    setCurrentTeam(currentTeam === 1 ? 2 : 1);

    setScreen('game');
  
  }

 // Fonction pour gérer la fin d'un tour
  const handleEndTurn = (score,remainingWords, correctWords) => {

  console.log('cest la fin du tour ' + remainingWords + 'le score de lequipe est de ' + score);

  
  // Crée une copie des scores actuels de la manche
  const newScores = [...roundScores];
  // Ajoute le score du tour actuel au score de l'équipe actuelle
  newScores[currentTeam - 1] += score;
  // Met à jour les scores de la manche avec les nouveaux scores
  setRoundScores(newScores);

  console.log('cest la manche actuelle ' + currentRound);
  console.log('lequipe actuelle est ' + currentTeam);
  console.log('le score de l\'equipe 1 est de ' + newScores[0] + ' et de l\'equipe 2 est de ' + newScores[1]);

  // Met à jour les mots restants avec les mots incorrects
  setRemainingWords(remainingWords);

  if(remainingWords !== undefined){
    // Vérifie s'il ne reste plus de mots à jouer
    if (remainingWords.length === 0) {
      console.log('La partie est gagnee il reste ' + remainingWords);
      
      // Met à jour les scores des équipes avec les scores de la manche actuelle
      setTeamScores(prevScores => [
          prevScores[0] + newScores[0],
          prevScores[1] + newScores[1]
      ]);

      // Change l'écran pour indiquer la fin de la manche
      setScreen('endRound');

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
        <WordsContext.Provider value={initialWords}>
          <GameScreen
              round={currentRound}
              team={currentTeam}
              onEndTurn={handleEndTurn}
              wordsForNextTurn={remainingWords.length ? remainingWords : undefined}
          />
        </WordsContext.Provider>
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
                    onNextTeam={handleStart}
                    team={currentTeam}
                />
            )}
            {screen === 'endRound' && (
                <EndRoundScreen
                    round={currentRound}
                    scores={teamScores}
                    onNextRound={handleNextRound}
                />
            )}
            
            {/*screen === 'nextRound' && (
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
