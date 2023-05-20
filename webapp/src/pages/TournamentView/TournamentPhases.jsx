import { Fragment, useState } from "react";
import BracketsView from "./BracketsView";

function TournamentPhases({phases}) {

    const [selectedPhase, setSelectedPhase] = useState(phases[0]);

    console.log(selectedPhase);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Fases
                </div>
                <div className="card-content">
                    {
                        selectedPhase.formatType === "BRACKET_PHASE"?
                            <BracketsView bracketPhase={selectedPhase}/>
                            :
                            <></>
                    }
                    
                </div>
            </div>
        </>
    );
}

export default TournamentPhases;