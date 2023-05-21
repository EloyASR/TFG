import { useState, useEffect } from "react";
import InputNumber from "../components/InputNumber";
import Combobox from "../Tournaments/Combobox";

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

    const setSize = (size) => {
        var newData = {
            size: size,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints
        }
        setPhaseData(newData)
    }

    const setWinPoints = (points) => {
        var newData = {
            size: data.size,
            winPoints: points,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints
        }
        setPhaseData(newData)
    }

    const setTiePoints = (points) => {
        var newData = {
            size: data.size,
            winPoints: data.winPoints,
            tiePoints: points,
            losePoints: data.losePoints
        }
        setPhaseData(newData)
    }

    const setLosePoints = (points) => {
        var newData = {
            size: data.size,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: points
        }
        setPhaseData(newData);
    }


    return (
        <>
            <>
                <div className="size-content">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <Combobox placeholder={"Número de jugadores"} label={"Número de jugadores"} itemsList={getLeagueSize(size, previousPhase)} id={"numerojugadores-" + phaseId} onChange={(value) => setSize(value)} selection={leagueData.size} />
                        </div>
                        <div className="size-1-2">
                            <div className="size-content">
                                <div className="flex spacing-large">
                                    <div className="size-1-3">
                                        <InputNumber id={"puntosvictoria-" + phaseId} label={"Victoria"} placeholder={"Puntos"} min={"0"} onChange={(e) => setWinPoints(e.target.valueAsNumber)} defaultValue={leagueData.winPoints} />
                                    </div>
                                    <div className="size-1-3">
                                        <InputNumber id={"puntosempate-" + phaseId} label={"Empate"} placeholder={"Puntos"} min={"0"} onChange={(e) => setTiePoints(e.target.valueAsNumber)} defaultValue={leagueData.tiePoints} />
                                    </div>
                                    <div className="size-1-3">
                                        <InputNumber id={"puntosderrota-" + phaseId} label={"Derrota"} placeholder={"Puntos"} min={"0"} onChange={(e) => setLosePoints(e.target.valueAsNumber)} defaultValue={leagueData.losePoints} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default PhaseConfigurationLeague;