import { useEffect, useState } from "react";
import InputNumber from "../components/InputNumber";
import InputRadio from "../components/InputRadio";
import Combobox from "../Tournaments/Combobox";

function PhaseConfigurationGroups({phaseId, groupData, setPhaseData}) {

    const [data, setData] = useState({});

    useEffect(()=>{
        setData(groupData);
    },[groupData])

    const setNumberOfPlayers = (numOfPlayers) => {
        var newData = {
            numberOfPlayers: numOfPlayers,
            numberOfGroups: data.numberOfGroups,
            naming: data.naming,
            matching: data.matching
        }

        setPhaseData(newData)
    }

    const setNumberOfGroups = (numOfGroups) => {
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            numberOfGroups: numOfGroups,
            naming: data.naming,
            matching: data.matching
        }

        setPhaseData(newData);
    }

    const setNaming = (naming) => {
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            numberOfGroups: data.numberOfGroups,
            naming: naming,
            matching: data.matching
        }

        setPhaseData(newData);
    }

    const setMatching = (matching) => {
        var newData = {
            numberOfPlayers: data.numberOfPlayers,
            numberOfGroups: data.numberOfGroups,
            naming: data.naming,
            matching: matching
        }

        setPhaseData(newData);
    }

    console.log(data);

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large">
                    <div className="size-1-2">
                        <InputNumber placeholder={"Número de jugadores"} label={"Número de jugadores"} min={"3"} onChange={(e)=>setNumberOfPlayers(e.target.valueAsNumber)} defaultValue={groupData.numberOfPlayers}/>
                    </div>
                    <div className="size-1-2">
                        <InputNumber placeholder={"Número de grupos"} label={"Número de grupos"} min={"2"} onChange={(e)=>setNumberOfGroups(e.target.valueAsNumber)} defaultValue={groupData.numberOfGroups}/>
                    </div>
                    <div className="size-1-2">
                        <Combobox  placeholder={"Nomenclatura de grupos"} label={"Nomenclatura de grupos"} itemsList={["Letters (A, B, C, ...)", "Numbers (1, 2, 3, ...)"]} onChange={(value)=>setNaming(value)}selection={groupData.naming}/>
                    </div>
                    <div className="size-1-2">
                        <InputRadio label={"Método de emparejamiento"} itemsList={["Single Robin", "Double Robin"]} id={"emparejamiento-" + phaseId} name={"emparejamiento-" + phaseId} defaultChecked={groupData.matching} checked={groupData.matching} onChange={(value)=> setMatching(value)}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfigurationGroups;