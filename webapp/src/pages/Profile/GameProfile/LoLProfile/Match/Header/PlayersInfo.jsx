import Player from "./Player"

function PlayersInfo(props) {
    return (
        <>
            <div className="players_info">
                <div className="team">
                    <Player name={"Player 1"} />
                    <Player name={"Player 2"} />
                    <Player name={"Player 3"} />
                    <Player name={"Player 4"} />
                    <Player name={"Player 5"} />
                </div>
                <div className="team">
                    <Player name={"Player 6"} />
                    <Player name={"Player 7"}/>
                    <Player name={"Player 8"}/>
                    <Player name={"Player 9"}/>
                    <Player name={"Player 10"}/>
                </div>
            </div>
        </>
    )
}

export default PlayersInfo;