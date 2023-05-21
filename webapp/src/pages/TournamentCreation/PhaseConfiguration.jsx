import InputText from "../components/InputText";
import Combobox from "../Tournaments/Combobox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PhaseConfigurationBrackets from "./PhaseConfigurationBrackets";
import PhaseConfigurationGroups from "./PhaseConfigurationGroups";
import PhaseConfigurationLeague from "./PhaseConfigurationLeague";

function PhaseConfiguration({ index, phase, phases, size, setPhaseName, setPhaseType, setPhaseData, deletePhase }) {

    const returnOptions = () => {

        if (index === 0) {
            switch (size) {
                case 2:
                    return ["Bracket"];
                case 3:
                    return ["League"];
                case 4:
                    return ["League", "Bracket"]
                case 5:
                    return ["League"]
                case 6:
                    return ["Groups", "League"]
                case 7:
                    return ["League"]
                case 8:
                    return ["Groups", "League", "Bracket"]
                case 9:
                    return ["League"]
                case 10:
                    return ["Groups", "League"]
                case 11:
                    return ["League"]
                case 12:
                    return ["Groups", "League"]
                default:
            }
        } else {
            if (size === 3) {
                return ["Bracket"]
            } else {
                return ["League", "Bracket"]
            }

        }
    }

    console.log(phases);

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large align-spread">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <InputText id={"phasename-" + index} label={"Nombre de fase"} placeholder={"Nombre de fase"} defaultValue={phase.phaseName} value={phase.phaseName} onChange={(e) => setPhaseName(e.target.value)} required={true} />
                        </div>
                        <div className="size-1-2">
                            <Combobox id={"phasetype-" + index} itemsList={returnOptions()} label={"Tipo de fase"} placeholder={"Tipo de fase"} onChange={(type) => setPhaseType(type)} selection={() => {
                                switch (phase.formatType) {
                                    case "LEAGUE_PHASE":
                                        return "League";
                                    case "GROUPS_PHASE":
                                        return "Groups";
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
                            phase.formatType === "GROUPS_PHASE" ? <PhaseConfigurationGroups phaseId={index} groupData={phase.groupsData} setPhaseData={(data) => setPhaseData(data, index)} size={size} /> : <></>
                        }
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