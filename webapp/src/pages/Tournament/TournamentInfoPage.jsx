import { useEffect } from "react";
import tournamentsService from "../../services/tournamentsService";

function TournamentInfoPage({params}) {

    useEffect(()=>{
        tournamentsService.getTournament(params.tournamentId);
    })

    return (
        <>
            <div className="tournament-page">
                <div className="tournament-header">
                    <div className="">
                        {}
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default TournamentInfoPage;