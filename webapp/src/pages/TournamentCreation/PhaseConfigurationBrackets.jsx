
import { useState, useEffect } from "react";
import InputNumber from "../components/InputNumber";
import InputRadio from "../components/InputRadio";
import Combobox from "../Tournaments/Combobox";

function PhaseConfigurationBrackets({phaseId, bracketsData, setPhaseData}) {

    const [data, setData] = useState({});

    useEffect(()=>{
        setData(bracketsData);
    },[bracketsData])

    const setNumberOfPlayers = (numOfPlayers) => {
        
        var newData = {
            numberOfPlayers: numOfPlayers,
            tieBreaker34Place: data.tieBreaker34Place,
            bestOf: data.bestOf,
        }

        setPhaseData(newData)
    }

    const setTieBreaker34Place = (tieBreaker) => {
        
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            tieBreaker34Place: tieBreaker,
            bestOf: data.bestOf,
        }

        setPhaseData(newData)
    }

    const setBestOf = (bestOf) => {
        
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            tieBreaker34Place: data.tieBreaker34Place,
            bestOf: bestOf,
        }

        setPhaseData(newData)
    }

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large">
                    <div className="size-1-2">
                        <InputNumber placeholder={"Número de jugadores"} label={"Número de jugadores"} min={"2"} id={"numerojugadores-" + phaseId} onChange={(e)=>setNumberOfPlayers(e.target.valueAsNumber)} defaultValue={bracketsData.numberOfPlayers}/>
                    </div>
                    <div className="size-1-2">
                        <InputRadio label={"¿Encuentro decisorio de 3ª y 4ª plaza?"} itemsList={["Si", "No"]} id={"emparejamientocuartotercero-" + phaseId} name={"emparejamientocuartotercero-" + phaseId} checked={bracketsData.tieBreaker34Place} defaultChecked={bracketsData.tieBreaker34Place} onChange={(value)=>setTieBreaker34Place(value)}/>
                    </div>
                    <div className="size-1-2">
                        <Combobox label={"Encuentro al mejor de"} placeholder={"Numero de partidas por enfrentamiento"} itemsList={[1,3,5]} id={"encuentromejorde-" + phaseId} name={"encuentromejorde-" + phaseId} selection={bracketsData.bestOf} onChange={(value)=>setBestOf(value)}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfigurationBrackets;
