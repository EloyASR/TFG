import { useEffect, useState } from "react";
import { images } from "../../helpers/images";

import MenuOptions from "../components/MenuOptions";
import TournamentParticipants from "./TournamentParticipants";
import TournamentInformation from "./TournamentInformation";
import TournamentPhases from "./TournamentPhases";
import TournamentCalendar from "./TournamentCalendar";
import tournamentService from "../../services/tournamentService";

import "./TournamentView.css";

function TournamentView({tournamentId}) {
    console.log(tournamentId);

    const [menuTab, setMenuTab] = useState("INFORMATION");

    const [tournamentData, setTournamentData] = useState({});
    const [game, setGame] = useState("valorant");

    const getTournamentData = async () => {
        var data = await tournamentService.getTournament(tournamentId)
        setTournamentData(data);
        setGame(data.game.toLowerCase());
    };

    useEffect(() => {
        getTournamentData();
    }, []);

    console.log(tournamentData);

    return (
        <>
            <div className="main">
                <div className="tournament-view-page">
                    <div className="flex vertical gap-medium">
                        <div className="card">
                            <div className="card-content relative">
                                <div className="background-img">
                                    <img src={images("./1300_350_" + game + ".png")} alt="" />
                                </div>
                                <div className="nombre-torneo">
                                    {tournamentData.name}
                                </div>
                            </div>
                        </div>
                        <MenuOptions options={[
                            {
                                type: "simple",
                                name: "Información",
                                onClick: () => setMenuTab("INFORMATION")
                            },
                            {
                                type: "simple",
                                name: "Participantes",
                                onClick: () => setMenuTab("PARTICIPANTS")
                            },
                            {
                                type: "simple",
                                name: "Fases",
                                onClick: () => setMenuTab("PHASES")
                            },
                            {
                                type: "simple",
                                name: "Calendario",
                                onClick: () => setMenuTab("CALENDAR")
                            }
                        ]} />

                        {
                            menuTab === "INFORMATION" ? <TournamentInformation tournamentInfo={tournamentData} /> : <></>
                        }
                        {
                            menuTab === "PARTICIPANTS" ? <TournamentParticipants participantsList={tournamentData.participants} /> : <></>
                        }
                        {
                            menuTab === "PHASES" ? <TournamentPhases phases={tournamentData.phases} /> : <></>
                        }
                        {
                            menuTab === "CALENDAR" ? <TournamentCalendar /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}

export default TournamentView;