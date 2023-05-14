import Participant from "./Participant";

function TournamentParticipants({ participantsList }) {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    Participantes
                </div>
                <div className="card-content">
                    <div className="flex">
                        {
                            participantsList.map(() => {
                                <Participant />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default TournamentParticipants;