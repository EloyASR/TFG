import "./LoLMatch.css"
import MatchTable from "./MatchTable/MatchTable"

function LoLMatch(props) {
    return <>
        <div class="partida-lol-detalle">
            <div class="equipo-azul">
                <MatchTable />
            </div>
        </div>
    </>;
}

export default LoLMatch