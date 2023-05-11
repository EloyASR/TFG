import InputText from "../components/InputText";
import Combobox from "../Tournaments/Combobox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PhaseConfigurationBrackets from "./PhaseConfigurationBrackets";
import PhaseConfigurationGroups from "./PhaseConfigurationGroups";
import PhaseConfigurationLeague from "./PhaseConfigurationLeague";

function PhaseConfiguration({ index, phase, setPhaseType, setPhaseData, deletePhase }) {


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
            case "Bracket":
                setPhaseData(
                    {
                        numberOfPlayers: undefined,
                        tieBreaker34Place:"No",
                        bestOf: undefined,
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
                setPhaseData({});
        }
        setPhaseType(type);
    }

    return (
        <>
            <div className="size-content">
                <div className="flex spacing-large align-spread">
                    <div className="flex spacing-large">
                        <div className="size-1-2">
                            <InputText id={"phasename-" + index} label={"Nombre de fase"} placeholder={"Nombre de fase"} />
                        </div>
                        <div className="size-1-2">
                            <Combobox id={"phasetype-" + index} itemsList={["Groups", "League", "Bracket"]} label={"Tipo de fase"} placeholder={"Tipo de fase"} onChange={(type) => configureType(type)} selection={phase.phaseType} />
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
                            phase.phaseType === "Groups" ? <PhaseConfigurationGroups phaseId={index} groupData={phase.phaseData} setPhaseData={(data) => setPhaseData(data, index)} /> : <></>
                        }
                        {
                            phase.phaseType === "League" ? <PhaseConfigurationLeague phaseId={index} leagueData={phase.phaseData} setPhaseData={(data) => setPhaseData(data, index)} /> : <></>
                        }
                        {
                            phase.phaseType === "Bracket" ? <PhaseConfigurationBrackets phaseId={index} bracketsData={phase.phaseData} setPhaseData={(data) => setPhaseData(data, index)} /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhaseConfiguration;