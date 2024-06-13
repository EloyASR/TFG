import "./TournamentsPage.css"
import "../Creation/TournamentCreationPage.css";
import Combobox from "./Combobox";
import TournamentItem from "./TournamentItem";
import { useEffect, useState } from "react";
import tournamentService from "../../../services/tournamentService";
import {useNavigate} from "react-router";
import gameService from "../../../services/gameService";
import Pagination from "../../components/Pagination";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faPlus} from "@fortawesome/free-solid-svg-icons";

function TournamentsPage({ownTournaments, sponsoredTournaments}) {

    const [tournaments, setTournaments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedGame, setSelectedGame] = useState("ALL");
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const [actualPage, setActualPage] = useState(1);
    const [totalPages, setTotalsPages] = useState(1);

    const getTournaments = async () => {
        if(ownTournaments) {
            let result = await tournamentService.getAllTournamentsByCreator(JSON.parse(localStorage.getItem("user")).uid, selectedStatus, selectedGame, actualPage)
            setTournaments(result.tournaments);
            setTotalsPages(result.totalPages);
        }else if(sponsoredTournaments){
            let result = await tournamentService.getAllTournamentsBySponsor(JSON.parse(localStorage.getItem("user")).uid, selectedStatus, selectedGame, actualPage)
            setTournaments(result.tournaments);
            setTotalsPages(result.totalPages);
        }else {
            let result = await tournamentService.getAllTournaments(selectedStatus, selectedGame, actualPage)
            setTournaments(result.tournaments);
            setTotalsPages(result.totalPages);
        }
    }

    const getGames = async () => {
        let returnGames = (await gameService.getGames()).games;
        let gamesList = [
            {
                _name: "ALL",
                name: "Todos",
                uid: "ALL",
            },...returnGames
        ]
        setGames(gamesList);
    }

    useEffect(() => {
        getGames();
        getTournaments();
    }, [actualPage,selectedGame, selectedStatus]);

    const status = [
        {
            name: "Todos",
            _name: "ALL"
        },
        {
            name: "Cerrado",
            _name: "CLOSED"
        },
        {
            name: "Registro abierto",
            _name: "INSCRIPTIONS_OPEN"
        },
        {
            name: "Registro cerrado",
            _name: "INSCRIPTIONS_CLOSED"
        },
        {
            name: "En curso",
            _name: "ON_COURSE"
        },
        {
            name: "Finalizado",
            _name: "FINISHED"
        }
    ]

    return (
        <>
            <div className="main">
                <div className="flex vertical gap-medium tournaments-page">
                    <div className="filters">
                        <Combobox itemsList={status.map((s) => s.name)} selection={"Todos"} label={"Estado"} onChange={(item)=>{
                            let statusChange = status.find((s)=>s.name === item)
                            setSelectedStatus(statusChange._name);
                        }}/>
                        <Combobox itemsList={games.map((juego) =>  juego.name)} selection={"Todos"} label={"Juego"} onChange={(item)=>{
                            let gameChange = games.find((g)=>g.name === item)
                            setSelectedGame(gameChange.uid);
                        }}/>
                        {
                            JSON.parse(localStorage.getItem("user")).role === "ADMIN" ?
                                <>
                                    <div className="separador-flex"></div>
                                    <div className={"flex align-bottom add accept"}>
                                        <button onClick={()=> navigate("/tournament/create")}>
                                            <FontAwesomeIcon icon={faPlus} />
                                            Crear Torneo
                                        </button>
                                    </div>
                                </>
                                :
                                <></>
                        }
                    </div>
                    <div className="tournaments">
                        <div className="flex vertical gap-medium body">
                            {
                                tournaments !== undefined && tournaments.length > 0?
                                    tournaments.map((tournament) => <TournamentItem key={tournament.uid} tournamentData={tournament} />)
                                    :
                                    <>
                                        <div className={"no-data-found flex vertical align-center align-middle gap-large"}>
                                            <FontAwesomeIcon icon={faCircleInfo} size={"2xl"} color={"#626363"}/>
                                            <p>No se han encontrado torneos</p>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    {
                        totalPages > 0 ?
                            <div className="flex align-center">
                                <Pagination numPages={totalPages} onClick={(number) => setActualPage(number)}/>
                            </div>
                            :
                            <></>

                    }
                </div>
            </div>
        </>
    );
}

export default TournamentsPage;