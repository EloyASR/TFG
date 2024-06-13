import GameInfo from "./GameInfo";
import PlayersInfo from "./PlayersInfo";
import SummonerInfo from "./SummonerInfo";
import { useState, useEffect } from "react";

function Data({data, win, summonerData, runesData}) {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return (
        <>
            <div className="data">
                <GameInfo queueId={data.info.queueId} gameDuration={data.info.gameDuration} win={win}/>
                <SummonerInfo data={summonerData} runesData={runesData}/>
                {
                    width >= 600?<PlayersInfo participants={data.info.participants} />:<></>
                }
            </div>
        </>
    );
}

export default Data