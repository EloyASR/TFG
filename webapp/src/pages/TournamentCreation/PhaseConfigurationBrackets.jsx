
import { useState, useEffect } from "react";
import InputNumber from "../components/InputNumber";
import InputRadio from "../components/InputRadio";
import Combobox from "../Tournaments/Combobox";

function CreateRoundsAndMatches(size) {
    let power = 0;
    let result = 1;
    let roundNumberOfParticipants = size / 2;
    let rounds = [];

    while (result <= size / 2) {
        result *= 2;
        power += 1;
        let round = {
            roundNumber: power,
            series: []
        }

        for (let i = 0; i < roundNumberOfParticipants; i++) {
            round.series.push({});
        }
        roundNumberOfParticipants /= 2;
        rounds.push(round);
    }

    return rounds
}

function getBracketSize(size, previousPhase) {
    if (previousPhase !== undefined) {
        switch (previousPhase.formatType) {
            case "GROUPS_PHASE":
                switch (size) {
                    case 6:
                        return [2, 4];
                    case 8:
                        return [2, 4];
                    case 10:
                        return [2, 4, 8];
                    case 12:
                        return [2, 4, 8];
                    default:
                        return [2];
                }
            case "LEAGUE_PHASE":
                switch (size) {
                    case 3:
                        return [2];
                    case 4:
                        return [2];
                    case 5:
                        return [2, 4];
                    case 6:
                        return [2, 4];
                    case 7:
                        return [2, 4];
                    case 8:
                        return [2, 4];
                    case 9:
                        return [2, 4, 8];
                    case 10:
                        return [2, 4, 8];
                    case 11:
                        return [2, 4, 8];
                    case 12:
                        return [2, 4, 8];
                    default:
                        return [2];
                }
            default:
                return [2]
        }
    } else {
        return [size];
    }

}

function PhaseConfigurationBrackets({ size, phaseId, bracketsData, setPhaseData, previousPhase }) {

    const [data, setData] = useState({});

    useEffect(() => {
        setData(bracketsData);
    }, [bracketsData])

    const setSize = (size) => {

        var newData = {
            size: size,
            tieBreaker: data.tieBreaker,
            bestOf: data.bestOf,
            rounds: CreateRoundsAndMatches(size)
        }

        setPhaseData(newData)
    }

    const setTieBreaker = (tieBreaker) => {

        var newData = {
            size: data.size,
            tieBreaker: tieBreaker === "Si" ? true : false,
            bestOf: data.bestOf,
            rounds: data.rounds
        }

        setPhaseData(newData)
    }

    const setBestOf = (bestOf) => {

        var newData = {
            size: data.size,
            tieBreaker: data.tieBreaker,
            bestOf: bestOf,
            rounds: data.rounds
        }

        setPhaseData(newData)
    }

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large">
                    <div className="size-1-2">
                        <Combobox placeholder={"Número de jugadores"} label={"Número de jugadores"} itemsList={getBracketSize(size, previousPhase)} id={"numerojugadores-" + phaseId} onChange={(value) => setSize(value)} selection={bracketsData.size} />
                    </div>
                    <div className="size-1-2">
                        <InputRadio label={"¿Encuentro decisorio de 3ª y 4ª plaza?"} itemsList={["Si", "No"]} id={"emparejamientocuartotercero-" + phaseId} name={"emparejamientocuartotercero-" + phaseId} checked={bracketsData.tieBreaker ? "Si" : "No"} defaultChecked={bracketsData.tieBreaker ? "Si" : "No"} onChange={(value) => setTieBreaker(value)} />
                    </div>
                    <div className="size-1-2">
                        <Combobox label={"Encuentro al mejor de"} placeholder={"Numero de partidas por enfrentamiento"} itemsList={[1, 3, 5]} id={"encuentromejorde-" + phaseId} name={"encuentromejorde-" + phaseId} selection={bracketsData.bestOf} onChange={(value) => setBestOf(value)} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfigurationBrackets;
