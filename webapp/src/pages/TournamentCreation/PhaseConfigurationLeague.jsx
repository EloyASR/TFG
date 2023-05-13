import { useState, useEffect } from "react";
import InputNumber from "../components/InputNumber";

function PhaseConfigurationLeague({ phaseId, leagueData, setPhaseData }) {


    const [data, setData] = useState({});

    useEffect(()=>{
        setData(leagueData);
    },[leagueData])

    const setNumberOfPlayers = (numOfPlayers) => {
        var newData = {
            numberOfPlayers: numOfPlayers,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints
        }
        setPhaseData(newData)
    }

    const setWinPoints = (points) => {
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            winPoints: points,
            tiePoints: data.tiePoints,
            losePoints: data.losePoints
        }
        setPhaseData(newData)
    }

    const setTiePoints = (points) => {
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            winPoints: data.winPoints,
            tiePoints: points,
            losePoints: data.losePoints
        }
        setPhaseData(newData)
    }

    const setLosePoints = (points) => {
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            winPoints: data.winPoints,
            tiePoints: data.tiePoints,
            losePoints: points
        }
        setPhaseData(newData)
    }


    return (
        <>
            <>
                <div className="size-content">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <InputNumber placeholder={"Número de jugadores"} label={"Número de jugadores"} min={"3"} id={"numerojugadores-" + phaseId} onChange={(e)=>setNumberOfPlayers(e.target.valueAsNumber)} defaultValue={leagueData.numberOfPlayers}/>
                        </div>
                        <div className="size-1-2">
                            <div className="size-content">
                                <div className="flex spacing-large">
                                    <div className="size-1-3">
                                        <InputNumber id={"puntosvictoria-" + phaseId} label={"Victoria"} placeholder={"Puntos"} min={"0"} onChange={(e)=>setWinPoints(e.target.valueAsNumber)} defaultValue={leagueData.winPoints}/>
                                    </div>
                                    <div className="size-1-3">
                                        <InputNumber id={"puntosempate-" + phaseId} label={"Empate"} placeholder={"Puntos"} min={"0"} onChange={(e)=>setTiePoints(e.target.valueAsNumber)} defaultValue={leagueData.tiePoints}/>
                                    </div>
                                    <div className="size-1-3">
                                        <InputNumber id={"puntosderrota-" + phaseId} label={"Derrota"} placeholder={"Puntos"} min={"0"} onChange={(e)=>setLosePoints(e.target.valueAsNumber)} defaultValue={leagueData.losePoints}/>
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