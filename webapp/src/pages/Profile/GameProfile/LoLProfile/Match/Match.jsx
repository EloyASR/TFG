import Table from "./Content/Table"
import MatchHeader from "./Header/MatchHeader"
import { useState } from "react";

function Match({ data, playerId }) {

    const [extended, setExtended] = useState(false);

    function toggle() {
        setExtended(!extended);
    }

    const equipoAzul = data.info.participants.filter(participant => participant.teamId === 100);
    const equipoRojo = data.info.participants.filter(participant => participant.teamId === 200);

    const jugadorEnAzul = equipoAzul.find(participant => participant.summonerId === playerId);

    var tables = <></>

    if (equipoAzul[0].win) {
        if (jugadorEnAzul != undefined) {
            tables =
                <>
                    <div className="win">
                        <Table data={equipoAzul} gameDuration={data.info.gameDuration} />
                    </div>
                    <div className="lose">
                        <Table data={equipoRojo} gameDuration={data.info.gameDuration} />
                    </div>
                </>
        }
        else{
            tables =
            <>
                <div className="lose">
                    <Table data={equipoRojo} gameDuration={data.info.gameDuration} />
                </div>
                <div className="win">
                    <Table data={equipoAzul} gameDuration={data.info.gameDuration} />
                </div>
            </>
        }
    } else {
        if (jugadorEnAzul != undefined) {
            tables =
                <>
                    <div className="lose">
                        <Table data={equipoAzul} gameDuration={data.info.gameDuration} />
                    </div>
                    <div className="win">
                        <Table data={equipoRojo} gameDuration={data.info.gameDuration} />
                    </div>
                </>
        }
        else{
            tables =
            <>
                <div className="win">
                    <Table data={equipoRojo} gameDuration={data.info.gameDuration} />
                </div>
                <div className="lose">
                    <Table data={equipoAzul} gameDuration={data.info.gameDuration} />
                </div>
            </>
        }

    }

    return <>
        <div className="partida-lol-detalle">
            <div className="match-header">
                <MatchHeader data={data} playerId={playerId} action={() => toggle()} />
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