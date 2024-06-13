import Participant from "./Participant";
import { Fragment, useEffect, useState } from "react";
import userService from "../../../../services/userService";
import {useOutletContext} from "react-router";
import tournamentService from "../../../../services/tournamentService";

function TournamentParticipants(props) {

    const {tournamentId} = useOutletContext()

    const [participants, setParticipants] = useState([]);

    useEffect(()=>{
        getParticipantsData();
    },[tournamentId])

    const getParticipantsData = async () => {

        let tournamentInfo = await tournamentService.getTournament(tournamentId);

        let newParticipants = [];

        for(let participant of tournamentInfo.participants){
            let newParticipant = {
                type: participant.type,
                id: participant.id
            }
            
            let user = await userService.getUser(participant.id);

            newParticipant.name = user.name;
            newParticipant.icon = user.icon;

            newParticipants.push(newParticipant);
        }

        setParticipants(newParticipants);
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
                            participants.length > 0 ?
                            participants.map((participant, index) => {
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
                <div className={"card-footer"}></div>
            </div>
        </>
    );
}

export default TournamentParticipants;