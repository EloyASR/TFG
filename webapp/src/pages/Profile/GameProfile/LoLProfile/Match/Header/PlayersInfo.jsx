import Player from "./Player"

function PlayersInfo({participants}) {
    return (
        <>
            <div className="players_info">
                <div className="team">
                    <Player name={participants[0].riotIdGameName} icon={participants[0].championName} />
                    <Player name={participants[1].riotIdGameName} icon={participants[1].championName}/>
                    <Player name={participants[2].riotIdGameName} icon={participants[2].championName}/>
                    <Player name={participants[3].riotIdGameName} icon={participants[3].championName}/>
                    <Player name={participants[4].riotIdGameName} icon={participants[4].championName}/>
                </div>
                <div className="team">
                    <Player name={participants[5].riotIdGameName} icon={participants[5].championName}/>
                    <Player name={participants[6].riotIdGameName} icon={participants[6].championName}/>
                    <Player name={participants[7].riotIdGameName} icon={participants[7].championName}/>
                    <Player name={participants[8].riotIdGameName} icon={participants[8].championName}/>
                    <Player name={participants[9].riotIdGameName} icon={participants[9].championName}/>
                </div>
            </div>
        </>
    )
}

export default PlayersInfo;