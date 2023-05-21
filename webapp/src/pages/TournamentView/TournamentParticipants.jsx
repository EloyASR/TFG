import Participant from "./Participant";
import { Fragment, useEffect, useState } from "react";
import UserService from "../../services/userService";

function TournamentParticipants({ participantsList }) {

    const [participants, setParticipants] = useState([]);

    useEffect(()=>{
        getParticipants();
    },[])

    const getParticipants = async function() {
        var newParticipants = [];

        for(var participant of participantsList){
            var newParticipant = {
                type: participant.type,
                identifier: participant.identifier
            }
            
            newParticipant.name =  await getName(participant.identifier);

            newParticipants.push(newParticipant);
        }

        setParticipants(newParticipants);
    }


    const getName = async (id) => {
        var usuario = await UserService.getUser(id);
        return usuario.name;
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Participantes
                </div>
                <div className="card-content">
                    <div className="flex spacing-large">
                        {
                            participants.length > 0?
                            participants.map((participant, index) => {
                                console.log(participant);
                                return (
                                    <Fragment key={index}>
                                        <Participant participant={participant} />
                                    </Fragment>
                                );
                            })
                            :
                            <div>Este torneo todavía no tiene participantes registrados</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default TournamentParticipants;