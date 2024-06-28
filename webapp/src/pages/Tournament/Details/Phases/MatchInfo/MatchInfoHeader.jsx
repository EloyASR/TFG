import Action from "../../../../Profile/GameProfile/LoLProfile/Match/Header/Action";
import Player from "./Player";

function MatchInfoHeader({data,action}) {

    const getBlueKills = () => {
        let result = 0;
        for (let i = 0; i <= 4; i++){
            result += data.info.participants[i].kills;
        }
        return result;
    }

    const getRedKills = () => {
        let result = 0;
        for (let i = 5; i <= 9; i++){
            result += data.info.participants[i].kills;
        }
        return result;
    }

    return (
        <>
            {
                data ?
                    <div className={data.info.participants[0].win ? "blue" : "red"}>
                        <div className={data.info.participants[0].win ? "match-info-header-data blue" : "match-info-header-data red"}>
                            <div className="team">
                                <Player position={"TOP"}
                                        icon={data.info.participants[0].championName}/>
                                <Player position={"JUNGLE"}
                                        icon={data.info.participants[1].championName}/>
                                <Player position={"MIDDLE"}
                                        icon={data.info.participants[2].championName}/>
                                <Player position={"BOTTOM"}
                                        icon={data.info.participants[3].championName}/>
                                <Player position={"SUPPORT"}
                                        icon={data.info.participants[4].championName}/>
                            </div>
                            <div className={"result"}>
                                <span className={"winner"}>{getBlueKills()}</span> - <span className={"loser"}>{getRedKills()}</span>
                            </div>
                            <div className="team reverse">
                                <Player position={"TOP"}
                                        icon={data.info.participants[5].championName}/>
                                <Player position={"JUNGLE"}
                                        icon={data.info.participants[6].championName}/>
                                <Player position={"MIDDLE"}
                                        icon={data.info.participants[7].championName}/>
                                <Player position={"BOTTOM"}
                                        icon={data.info.participants[8].championName}/>
                                <Player position={"SUPPORT"}
                                        icon={data.info.participants[9].championName}/>
                            </div>
                        </div>
                        <Action onClick={() => action()}/>
                    </div>
                    :
                    <></>
            }
        </>
    );
}

export default MatchInfoHeader