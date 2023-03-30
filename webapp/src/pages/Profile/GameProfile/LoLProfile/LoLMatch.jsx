import MatchTable from "./MatchTable"
import MatchHeader from "./Match/Header/MatchHeader"
import { useState } from "react";

function LoLMatch({ data , playerId }) {

    const [extended, setExtended] = useState(false);

    function toggle(){
        setExtended(!extended);
    }

    return <>
        <div className="partida-lol-detalle">
            <div className="match-header">
                <MatchHeader data={data} playerId={playerId} action={()=>toggle()}/>
            </div>
            {
                extended ?
                    <div className="match-extended">
                        <div className="equipo-azul">
                            <MatchTable data={data} />
                        </div>
                        <div className="equipo-rojo">
                            <MatchTable data={data} />
                        </div>
                    </div> : <></>
            }
        </div>
    </>;
}



export default LoLMatch