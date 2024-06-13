import {useEffect, useState} from "react";
import BracketsView from "./BracketsView";
import {useOutletContext} from "react-router";
import tournamentService from "../../../../services/tournamentService";
import LeagueView from "./LeagueView";
import ClosePhaseModal from "./ClosePhaseModal";

function TournamentPhases() {

    const {tournamentId} = useOutletContext();

    const [tournamentData, setTournamentData] = useState(undefined);
    const [selectedPhase, setSelectedPhase] = useState(0);

    const [showClosePhaseModal, setShowCloseModal] = useState(false);

    useEffect(()=> {
        updateData();
    },[tournamentId])

    const updateData = async () => {
        const result = await tournamentService.getTournament(tournamentId);
        if(result.currentPhase < result.phases.length) {
            setSelectedPhase(result.currentPhase);
        }else{
            setSelectedPhase(0);
        }
        setTournamentData(result);
    };

    const moveUpPhase =  (e) => {
        e.preventDefault();
        if(tournamentData && (selectedPhase < (tournamentData.phases.length - 1))){
            setSelectedPhase(selectedPhase + 1)
        }
    }

    const moveDownPhase = (e) => {
        e.preventDefault();
        if(tournamentData && (selectedPhase > 0)){
            setSelectedPhase(selectedPhase - 1)
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Fases
                </div>
                <div className="card-content">
                    <div className={"phase-selector flex horizontal gap-medium mb-4"}>
                        {
                            tournamentData && tournamentData.phases.length > 1 ?
                                <>
                                    <button onClick={(e)=>moveDownPhase(e)}>&lt;</button>
                                    <div className={"flex vertical align-center align-middle size-all"}>{tournamentData ? tournamentData.phases[selectedPhase].phaseName : ""}</div>
                                    <button onClick={(e)=>moveUpPhase(e)}>&gt;</button>
                                </>
                                :
                                <div className={"flex vertical align-center align-middle size-all"}>{tournamentData ? tournamentData.phases[selectedPhase].phaseName : ""}</div>
                        }

                    </div>
                    {
                        tournamentData !== undefined && tournamentData.phases[selectedPhase] !== undefined ?
                            tournamentData.phases[selectedPhase].formatType === "BRACKET_PHASE" ?
                                <BracketsView
                                    tournamentData={tournamentData}
                                    phaseNumber={selectedPhase}
                                    updateData={updateData}/>
                                :
                                <LeagueView
                                    tournamentData={tournamentData}
                                    phaseNumber={selectedPhase}
                                    updateData={updateData}/>
                            :
                            <></>
                    }
                </div>
                <div className="card-footer">
                    {
                        tournamentData && selectedPhase === tournamentData.currentPhase && tournamentData.status === "ON_COURSE" ?
                            <div className={"size-1-2 delete"}>
                                <button onClick={() => {setShowCloseModal(true)}}>Cerrar fase</button>
                            </div>
                            :
                            <></>
                    }

                </div>
                {
                    showClosePhaseModal ?
                        <ClosePhaseModal tournamentData={tournamentData} closeModal={setShowCloseModal}/>
                        :
                        <></>
                }
            </div>
        </>
    );
}

export default TournamentPhases;