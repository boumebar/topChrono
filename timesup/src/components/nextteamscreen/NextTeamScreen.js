import './NextTeamScreen.css';

export default function NextTeamScreen({round,correctWordsLength, team, onNextTeam}) {


    console.log(correctWordsLength);
    return (
        <div className="next-team-screen">
            <h1>Manche {round}</h1>
            <button onClick={onNextTeam}>Au tour de l'equipe { team }</button>

            
        </div>
    );
}