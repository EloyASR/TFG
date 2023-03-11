import MatchTable from "./MatchTable"

function LoLMatch(props) {
    return <>
        <div className="partida-lol-detalle">
            <div className="equipo-azul">
                <MatchTable />
            </div>
        </div>
    </>;
}

export default LoLMatch