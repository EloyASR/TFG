import { useState, useEffect } from "react";
import InputNumber from "../../components/InputNumber";
import Combobox from "../List/Combobox";

function getLeagueSize(size, previousPhase) {
    if (previousPhase) {
        switch (previousPhase.formatType) {
            case ("GROUPS_PHASE"):
                switch (size) {
                    case 6:
                        return [4]
                    case 8:
                        return [4, 6]
                    case 10:
                        return [4, 6, 8]
                    case 12:
                        return [4, 6, 8, 10]
                    default:
                        return [4];
                }
            case ("LEAGUE_PHASE"):
                switch (size) {
                    case 4:
                        return [3]
                    case 5:
                        return [3, 4]
                    case 6:
                        return [3, 4, 5]
                    case 7:
                        return [3, 4, 5, 6]
                    case 8:
                        return [3, 4, 5, 6, 7]
                    case 9:
                        return [3, 4, 5, 6, 7, 8]
                    case 10:
                        return [3, 4, 5, 6, 7, 8, 9]
                    case 11:
                        return [3, 4, 5, 6, 7, 8, 9, 10]
                    case 12:
                        return [3, 4, 5, 6, 7, 8, 9, 11]
                    default:
                        return [3]
                }
            default:
                return [size];
        }
    }else{
        return [size];
    }
}

function PhaseConfigurationLeague({ phaseId, leagueData, setPhaseData, size, previousPhase }) {

    const [data, setData] = useState({});

    useEffect(() => {
        setData(leagueData);
    }, [leagueData])

    function CreateRoundsAndMatches(size) {
        let rounds = [];

        for (let i = 0; i < size-1; i++){
            let series = []

            for(let j = 0; j < size/2; j++){
                series.push({
                    roundNumber: i,
                    serieNumber: j
                })
            }

            rounds.push({
                roundNumber: i,
                series: series
            })
        }

        return rounds
    }

    const setSize = (size) => {
        let newData = {
            bestOf: data.bestOf,
            size: size,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints,
            rounds: CreateRoundsAndMatches(size),
        }
        setPhaseData(newData)
    }

    const setWinPoints = (points) => {
        let newData = {
            bestOf: data.bestOf,
            size: data.size,
            winPoints: points,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints,
            rounds: data.rounds,
        }
        setPhaseData(newData)
    }

    const setLosePoints = (points) => {
        let newData = {
            bestOf: data.bestOf,
            size: data.size,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: points,
            rounds: data.rounds,
        }
        setPhaseData(newData);
    }

    const setBestOf = (bestOf) => {
        let newData = {
            bestOf: bestOf,
            size: data.size,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints,
            rounds: data.rounds,
        }
        setPhaseData(newData);
    }

    return (
        <>
            <>
                <div className="size-content">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <Combobox placeholder={"Número de jugadores"} label={"Número de jugadores *"} itemsList={getLeagueSize(size, previousPhase)} id={"numerojugadores-" + phaseId} onChange={(value) => setSize(value)} selection={leagueData.size} required={true} />
                        </div>
                        <div className="size-1-2">
                            <div className="size-content">
                                <div className="flex spacing-large">
                                    <div className="size-1-2">
                                        <InputNumber id={"puntosvictoria-" + phaseId} label={"Puntos por Victoria *"} placeholder={"Puntos"} min={"0"} onChange={(e) => setWinPoints(e.target.valueAsNumber)} defaultValue={leagueData.winPoints} required={true}/>
                                    </div>
                                    <div className="size-1-2">
                                        <InputNumber id={"puntosderrota-" + phaseId} label={"Puntos por Derrota *"} placeholder={"Puntos"} onChange={(e) => setLosePoints(e.target.valueAsNumber)} defaultValue={leagueData.losePoints} required={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="size-1-2">
                            <Combobox label={"Encuentro al mejor de: *"} placeholder={"Numero de partidas por enfrentamiento"} itemsList={[1, 3, 5]} id={"encuentromejorde-" + phaseId} name={"encuentromejorde-" + phaseId} selection={leagueData.bestOf} onChange={(value) => setBestOf(value)} required={true} />
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default PhaseConfigurationLeague;