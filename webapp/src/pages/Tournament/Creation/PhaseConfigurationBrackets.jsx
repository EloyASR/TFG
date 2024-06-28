
import { useState, useEffect } from "react";
import Combobox from "../List/Combobox";

function CreateRoundsAndMatches(size) {
    let power = 0;
    let result = 1;
    let roundNumberOfParticipants = size / 2;
    let rounds = [];

    while (result <= size / 2) {
        result *= 2;
        power += 1;
        let round = {
            roundNumber: power-1,
            series: []
        }
        for (let i = 0; i < roundNumberOfParticipants; i++) {
            round.series.push({
                serieNumber: i,
                roundNumber: power-1,
                home_participant_parent_round: power-2,
                home_participant_parent_serie: (i + 1) * 2 - 2,
                away_participant_parent_round: power-2,
                away_participant_parent_serie: (i + 1) * 2 - 1,
                next_round: power,
                next_serie: Math.floor(i/2),
            });
        }
        roundNumberOfParticipants /= 2;
        rounds.push(round);
    }
    return rounds
}

function getBracketSize(size, previousPhase) {
    if (previousPhase !== undefined) {
        switch (previousPhase.formatType) {
            case "LEAGUE_PHASE":
                switch (size) {
                    case 4:
                        return [2];
                    case 6:
                        return [2, 4];
                    case 8:
                        return [2, 4];
                    case 10:
                        return [2, 4, 8];
                    case 12:
                        return [2, 4, 8];
                    case 14:
                        return [2, 4, 8];
                    case 16:
                        return [2, 4, 8];
                    default:
                        return [2];
                }
            default:
                return [2];
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

        let newData = {
            size: size,
            tieBreaker: data.tieBreaker,
            bestOf: data.bestOf,
            rounds: CreateRoundsAndMatches(size)
        }

        setPhaseData(newData)
    }

    const setBestOf = (bestOf) => {

        let newData = {
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
                        <Combobox placeholder={"Número de jugadores"} label={"Número de jugadores *"} itemsList={getBracketSize(size, previousPhase)} id={"numerojugadores-" + phaseId} name={"numerojugadores-" + phaseId} onChange={(value) => setSize(value)} selection={bracketsData.size} required={true}/>
                    </div>
                    <div className="size-1-2">
                        <Combobox label={"Encuentro al mejor de: *"} placeholder={"Numero de partidas por enfrentamiento"} itemsList={[1, 3, 5]} id={"encuentromejorde-" + phaseId} name={"encuentromejorde-" + phaseId} selection={bracketsData.bestOf} onChange={(value) => setBestOf(value)} required={true} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfigurationBrackets;
