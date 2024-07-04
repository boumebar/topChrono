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
 // const [showCard, setShowCard] = useState(false);

  const handleStart = () => setScreen('game');

  // const handleStartClick = () => {
  //   setShowCard(true);
  // };



  return (
    <div className="App">
      {/* <header className="App-header">
        {!showCard && <h1>Time's Up !</h1>}
        {!showCard && <button className="button" onClick={handleStartClick}>Jouer !</button>}
        {showCard && <Card comptearebours={40}/>}
      </header>
        */}
       {screen === 'start' && <StartScreen onStart={handleStart}/>}
       {screen === 'game' && (
          <GameScreen
              // team={currentTeam}
              // onEndTurn={handleEndTurn}
          />
        )}
            {/* {screen === 'roundInfo' && (
                <RoundInfoScreen
                    round={currentRound}
                    scores={roundScores}
                    onValidate={handleValidateRound}
                />
            )}
            {screen === 'nextTeam' && (
                <NextTeamScreen
                    round={currentRound}
                    onNextTeam={handleNextTeam}
                />
            )}
            {screen === 'endRound' && (
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
