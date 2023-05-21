import { images } from "../../helpers/images";
import VerticalSpliter from "../components/VerticalSpliter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

function TournamentInformation({ tournamentInfo }) {


    const [description, setDescription] = useState("");
    const [rules, setRules] = useState("");
    const [game, setGame] = useState("valorant");
    const [size, setSize] = useState(0);
    const [numParticipants, setNumParticipants] = useState(0);
    const [descriptionSplited, setDescriptionSplited] = useState([]);
    const [rulesSplited, setRulesSplited] = useState([]);

    useEffect(() => {
        console.log(tournamentInfo);
        if (tournamentInfo) {
            if (tournamentInfo.description !== undefined) {
                setDescription(tournamentInfo.description);
                setDescriptionSplited(tournamentInfo.description.split("\n"));
            }
            if (tournamentInfo.rules !== undefined) {
                setRules(tournamentInfo.rules);
                setRulesSplited(tournamentInfo.rules.split("\n"));
            }
            if (tournamentInfo.game !== undefined) {
                setGame(tournamentInfo.game.toLowerCase());
            }
            if (tournamentInfo.size !== undefined) {
                setSize(tournamentInfo.size);
            }
            if (tournamentInfo.participants !== undefined) {
                setNumParticipants(tournamentInfo.participants.length);
            }
        }
    }, [tournamentInfo])

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Información
                </div>
                <div className="card-content">
                    <div className="size-content">
                        <div className="flex no-wrap align-spread">
                            <div className="flex vertical spacing-large">
                                <div className="size-content">
                                    <h2>Descripción</h2>
                                    {
                                        description === "" ? "Este torneo no dispone de descripción"
                                            :
                                            descriptionSplited.map(element => <p>{element}</p>)

                                    }
                                </div>
                                <div className="size-content">
                                    <h2>Reglas</h2>
                                    <p>
                                        {
                                            rules === "" ? "Este torneo no dispone de reglas" 
                                            :
                                            rulesSplited.map(rule => <p>{rule}</p>)
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex no-wrap size-1-4">
                                <VerticalSpliter />
                                <div className="flex vertical game-card spacing-medium align-middle">
                                    <span>Juego</span>
                                    <img src={images("./" + game + "_torneo.jpg")} alt="" />
                                    <div className="size-content flex align-center align-middle spacing-small">
                                        <FontAwesomeIcon icon={faUser} />
                                        <span>
                                            {
                                                numParticipants
                                            }
                                            /
                                            {
                                                size + " "
                                            }
                                            Participantes
                                        </span>
                                    </div>
                                    <div className="size-content flex align-center align-middle spacing-small">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        <span>Online</span>
                                    </div>
                                    <div className="size-1-1">
                                        <button>
                                            <div className="flex align-center align-middle">
                                                Inscribirse
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TournamentInformation;
