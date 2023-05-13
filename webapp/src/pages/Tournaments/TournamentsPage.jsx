import "./TournamentsPage.css"
import "../TournamentCreation/TournamentCreationPage.css";
import Combobox from "./Combobox";
import TournamentItem from "./TournamentItem";
import { useEffect, useState } from "react";
import tournamentService from "../../services/tournamentService";
import { Link } from "wouter";

function TournamentsPage(props) {


    const [data, setData] = useState();

    const getTournaments = async () => {
        setData(await tournamentService.getAllTournaments());
    }

    useEffect(() => {
        getTournaments();
    }, []);

    const juegos = ["All", "League of Legends", "Valorant"]

    return (
        <>
            <div className="tournaments-page">
                <div className="filters">
                    <button className="filter-button selected">All</button>
                    <button className="filter-button">Open</button>
                    <button className="filter-button">Closed</button>
                    <div className="separador-flex"></div>

                    <Combobox itemsList={juegos}/>
                    <Link href="/tournament/create">
                        <button className="filter-button">Crear Torneo</button>
                    </Link>
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