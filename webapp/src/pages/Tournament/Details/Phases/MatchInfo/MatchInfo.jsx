import Table from "../../../../Profile/GameProfile/LoLProfile/Match/Content/Table"
import {useEffect, useState} from "react";
import leagueOfLegendsService from "../../../../../services/leagueOfLegendsService";
import MatchInfoHeader from "./MatchInfoHeader";

function MatchInfo({ matchId, home_participant, away_participant, runesData }) {

    const [extended, setExtended] = useState(false);
    const [data, setData] = useState(undefined);

    const [equipoAzul, setEquipoAzul] = useState([]);
    const [equipoRojo, setEquipoRojo] = useState([]);

    useEffect(()=> {
        getMatchData();
    },[]);

    const getMatchData = async () => {
        let gameData = await leagueOfLegendsService.getGameData(matchId)
        setData(gameData);
        setEquipoAzul(gameData.info.participants.filter(participant => participant.teamId === 100))
        setEquipoRojo(gameData.info.participants.filter(participant => participant.teamId === 200))
    }

    const toggle = () => {
        setExtended(!extended);
    }

    let tables = <></>;

    if(data && equipoAzul && equipoRojo) {
        if (equipoAzul[0].win) {
            tables =
                <>
                    <div className="win">
                        <Table data={equipoAzul} gameDuration={data.info.gameDuration} runesData={runesData} />
                    </div>
                    <div className="lose">
                        <Table data={equipoRojo} gameDuration={data.info.gameDuration} runesData={runesData}/>
                    </div>
                </>
        } else {
            tables = <>
                <div className="lose">
                    <Table data={equipoAzul} gameDuration={data.info.gameDuration} runesData={runesData}/>
                </div>
                <div className="win">
                    <Table data={equipoRojo} gameDuration={data.info.gameDuration} runesData={runesData}/>
                </div>
            </>
        }
    }

    return <>
        <div className="match-info">
            <div className="match-info-header">
                <MatchInfoHeader data={data} action={() => toggle()} runesData={runesData}/>
            </div>
            {
                extended ?
                    <div className="match-extended">
                        {
                            tables
                        }

                    </div> : <></>
            }
        </div>
    </>;
}



export default MatchInfo