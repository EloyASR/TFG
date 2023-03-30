import GameInfo from "./GameInfo";
import PlayersInfo from "./PlayersInfo";
import SummonerInfo from "./SummonerInfo";

function Data({data, win, summonerData}) {
    return (
        <>
            <div className="data">
                <GameInfo queueId={data.info.queueId} gameDuration={data.info.gameDuration} win={win}/>
                <SummonerInfo data={summonerData}/>
                <PlayersInfo />
            </div>
        </>
    );
}

export default Data