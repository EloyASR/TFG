import Table from "./Content/Table"
import MatchHeader from "./Header/MatchHeader"
import { useState } from "react";

function Match({ data, playerId, runesData }) {

    const [extended, setExtended] = useState(false);

    function toggle() {
        setExtended(!extended);
    }

    const equipoAzul = data.info.participants.filter(participant => participant.teamId === 100);
    const equipoRojo = data.info.participants.filter(participant => participant.teamId === 200);

    const jugadorEnAzul = equipoAzul.find(participant => participant.summonerId === playerId);

    let tables = <></>

    if (equipoAzul[0].win) {
        if (jugadorEnAzul !== undefined) {
            tables =
                <>
                    <div className="win">
                        <Table data={equipoAzul} gameDuration={data.info.gameDuration} runesData={runesData} />
                    </div>
                    <div className="lose">
                        <Table data={equipoRojo} gameDuration={data.info.gameDuration} runesData={runesData}/>
                    </div>
                </>
        }
        else{
            tables =
            <>
                <div className="lose">
                    <Table data={equipoRojo} gameDuration={data.info.gameDuration} runesData={runesData}/>
                </div>
                <div className="win">
                    <Table data={equipoAzul} gameDuration={data.info.gameDuration} runesData={runesData}/>
                </div>
            </>
        }
    } else {
        if (jugadorEnAzul !== undefined) {
            tables =
                <>
                    <div className="lose">
                        <Table data={equipoAzul} gameDuration={data.info.gameDuration} runesData={runesData}/>
                    </div>
                    <div className="win">
                        <Table data={equipoRojo} gameDuration={data.info.gameDuration} runesData={runesData}/>
                    </div>
                </>
        }
        else{
            tables =
            <>
                <div className="win">
                    <Table data={equipoRojo} gameDuration={data.info.gameDuration} runesData={runesData}/>
                </div>
                <div className="lose">
                    <Table data={equipoAzul} gameDuration={data.info.gameDuration} runesData={runesData}/>
                </div>
            </>
        }

    }

    return <>
        <div className="partida-lol-detalle">
            <div className="match-header">
                <MatchHeader data={data} playerId={playerId} action={() => toggle()} runesData={runesData}/>
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



export default Match