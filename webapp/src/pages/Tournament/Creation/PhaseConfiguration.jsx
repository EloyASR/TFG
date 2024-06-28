import InputText from "../../components/InputText";
import Combobox from "../List/Combobox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PhaseConfigurationBrackets from "./PhaseConfigurationBrackets";
import PhaseConfigurationLeague from "./PhaseConfigurationLeague";

function PhaseConfiguration({ index, phase, phases, size, setPhaseName, setPhaseType, setPhaseData, deletePhase }) {

    const returnOptions = () => {
        switch (size) {
            case 2:
                return ["Bracket"];
            case 4:
                return ["League", "Bracket"]
            case 6:
                return ["League"]
            case 8:
                return ["League", "Bracket"]
            case 10:
                return ["League"]
            case 12:
                return ["League"]
            case 14:
                return ["League"]
            case 16:
                return ["League", "Bracket"]
            default:
                return []
        }
    }

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large align-spread">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <InputText id={"phasename-" + index} name={"phasename-" + index} label={"Nombre de fase *"} placeholder={"Nombre de fase"} defaultValue={phase.phaseName} onChange={(e) => setPhaseName(e.target.value)} required={true} />
                        </div>
                        <div className="size-1-2">
                            <Combobox id={"phasetype-" + index} name={"phasetype-" + index} itemsList={returnOptions()} label={"Tipo de fase *"} placeholder={"Tipo de fase"} onChange={(type) => setPhaseType(type)} selection={() => {
                                switch (phase.formatType) {
                                    case "LEAGUE_PHASE":
                                        return "League";
                                    case "BRACKET_PHASE":
                                        return "Bracket";
                                    default:
                                        return "";
                                }
                            }} required={true} />
                        </div>
                    </div>
                    {
                        phases.length > 1 ? <div className="flex align-bottom size-1-5 delete">
                            <button onClick={(e) => {
                                e.preventDefault();
                                deletePhase(index);
                            }}>
                                <FontAwesomeIcon icon={faTrashCan} />
                                Eliminar
                            </button>

                        </div>
                            : <></>
                    }
                    <div className="size-1-1">
                        {
                            index === 1 ?
                                phase.formatType === "LEAGUE_PHASE" ? <PhaseConfigurationLeague phaseId={index} leagueData={phase.leagueData} setPhaseData={(data) => setPhaseData(data, index)} size={size} previousPhase={phases[0]}/> : <></>
                                :
                                phase.formatType === "LEAGUE_PHASE" ? <PhaseConfigurationLeague phaseId={index} leagueData={phase.leagueData} setPhaseData={(data) => setPhaseData(data, index)} size={size} /> : <></>
                        }
                        {
                            index === 1 ?
                                phase.formatType === "BRACKET_PHASE" ? <PhaseConfigurationBrackets phaseId={index} bracketsData={phase.bracketData} setPhaseData={(data) => setPhaseData(data, index)} size={size} previousPhase={phases[0]} /> : <></>
                                :
                                phase.formatType === "BRACKET_PHASE" ? <PhaseConfigurationBrackets phaseId={index} bracketsData={phase.bracketData} setPhaseData={(data) => setPhaseData(data, index)} size={size} /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfiguration;