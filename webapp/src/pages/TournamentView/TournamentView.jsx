import { useState } from "react";
import { images } from "../../helpers/images";

import MenuOptions from "../components/MenuOptions";
import TournamentParticipants from "./TournamentParticipants";
import TournamentInformation from "./TournamentInformation";
import TournamentPhases from "./TournamentPhases";
import TournamentCalendar from "./TournamentCalendar";

import "./TournamentView.css";

function TournamentView() {

    const [menuTab, setMenuTab] = useState("INFORMATION");

    return (
        <>
            <div className="tournament-view-page">
                <div className="flex vertical gap-medium">
                    <div className="card">
                        <div className="card-content">
                            <div className="background-img">
                                <img src={images('./val-1300-350.png')} alt="" />
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
                        menuTab === "INFORMATION" ? <TournamentInformation /> : <></>
                    }
                    {
                        menuTab === "PARTICIPANTS" ? <TournamentParticipants participantsList={[]} /> : <></>
                    }
                    {
                        menuTab === "PHASES" ? <TournamentPhases /> : <></>
                    }
                    {
                        menuTab === "CALENDAR" ? <TournamentCalendar /> : <></>
                    }
                </div>
            </div>


        </>
    );

}

export default TournamentView;