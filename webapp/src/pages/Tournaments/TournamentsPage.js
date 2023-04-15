import "./TournamentsPage.css"
import Combobox from "./Combobox";
import TournamentItem from "./TournamentItem";
import { useEffect, useState } from "react";
import tournamentsService from "../../services/tournamentsService";

function TournamentsPage(props) {


    const [data, setData] = useState();

    const getTournaments = async () => {
        setData(await tournamentsService.getAllTournaments());
    }

    useEffect(() => {
        getTournaments();
    }, []);

    const juegos = ["Juego", "League of Legends", "Valorant"]

    return (
        <>
            <div className="tournaments-page">
                <div className="filters">
                    <button className="filter-button selected">All</button>
                    <button className="filter-button">Open</button>
                    <button className="filter-button">Closed</button>
                    <div className="separador-flex"></div>
                    <Combobox itemsList={juegos} />
                </div>
                <div className="tournaments">
                    <div className="body">
                        {
                            data !== undefined && data !== null ?
                                data.map((tournament) => <TournamentItem tournamentData={tournament} />)
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default TournamentsPage;