import InputText from "../components/InputText";
import Combobox from "../Tournaments/Combobox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PhaseConfigurationBrackets from "./PhaseConfigurationBrackets";
import PhaseConfigurationGroups from "./PhaseConfigurationGroups";
import PhaseConfigurationLeague from "./PhaseConfigurationLeague";

function PhaseConfiguration({ index, phase, setPhaseName, setPhaseType, setPhaseData, deletePhase }) {


    const configureType = (type) => {
        switch (type) {
            case "Groups":
                setPhaseData(
                    {
                        numberOfPlayers: undefined,
                        numberOfGroups: undefined,
                        naming: undefined,
                        matching: "Single Robin"
                    }
                );
                break;
            case "League":
                setPhaseData(
                    {
                        numberOfPlayers: undefined,
                        winPoints: 3,
                        tiePoints: 1,
                        losePoints: 0
                    }
                );
                break;
            default:
        }
        setPhaseType(type);
    }

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large align-spread">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <InputText id={"phasename-" + index} label={"Nombre de fase"} placeholder={"Nombre de fase"} defaultValue={phase.phaseName} onChange={(e)=>setPhaseName(e.target.value)}/>
                        </div>
                        <div className="size-1-2">
                            <Combobox id={"phasetype-" + index} itemsList={["Groups", "League", "Bracket"]} label={"Tipo de fase"} placeholder={"Tipo de fase"} onChange={(type) => configureType(type)} selection={() => {
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
                            }} />
                        </div>
                    </div>
                    <div className="flex align-bottom size-1-5 delete">
                        <button onClick={(e) => {
                            e.preventDefault();
                            deletePhase(index);
                        }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            Eliminar
                        </button>
                    </div>
                    <div className="size-1-1">
                        {
                            phase.formatType === "GROUPS_PHASE" ? <PhaseConfigurationGroups phaseId={index} groupData={phase.groupsData} setPhaseData={(data) => setPhaseData(data, index)} /> : <></>
                        }
                        {
                            phase.formatType === "LEAGUE_PHASE" ? <PhaseConfigurationLeague phaseId={index} leagueData={phase.leagueData} setPhaseData={(data) => setPhaseData(data, index)} /> : <></>
                        }
                        {
                            phase.formatType === "BRACKET_PHASE" ? <PhaseConfigurationBrackets phaseId={index} bracketsData={phase.bracketData} setPhaseData={(data) => setPhaseData(data, index)} /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfiguration;