import { useEffect, useState } from "react";
import { images } from "../../../helpers/images";

import MenuOptions from "../../components/MenuOptions";
import tournamentService from "../../../services/tournamentService";

import "./TournamentDetails.css";
import { faCalendar, faFileLines, faSitemap, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Outlet } from 'react-router';
import gameService from "../../../services/gameService";
import {useAlert} from "../../../context/AlertContext";
import VerticalBanner from "../../components/VerticalBanner";
import HorizontalBanner from "../../components/HorizontalBanner";


function TournamentDetails({ tournamentId }) {

    const { showAlert } = useAlert();

    const currentUrl = window.location.pathname;

    // Extract the tab information from the URL
    const menuTab = currentUrl.split("/")[3];

    const navigate = useNavigate();

    const [tournamentData, setTournamentData] = useState({});
    const [game, setGame] = useState({_name:"DEFAULT", name:"Default"});
    const [verticalBanners, setVerticalBanners] = useState(undefined);
    const [horizontalBanners, setHorizontalBanners] = useState(undefined);

    const getTournamentData = async () => {
        const data = await tournamentService.getTournament(tournamentId)
        getBanners(data)
        setTournamentData(data);
        getGameData(data.game);
    };

    const getGameData = async (game) => {
        const newGame = await gameService.getGame(game)
        setGame(newGame);
    }

    const getBanners = (tournamentInfo) => {

        setHorizontalBanners(undefined);
        setVerticalBanners(undefined);

        let verticalBannersToAdd = [];
        let horizontalBannersToAdd = [];

        if(tournamentInfo.sponsoredBy) {
            for(let sponsor of tournamentInfo.sponsoredBy) {
                if(sponsor.status === "ACCEPTED"){
                    for(let banner of sponsor.banners300x600) {
                        verticalBannersToAdd.push(banner);
                    }
                    for(let banner of sponsor.banners1100x300){
                        horizontalBannersToAdd.push(banner);
                    }
                }
            }
        }

        if(horizontalBannersToAdd.length > 0) {
            setHorizontalBanners(horizontalBannersToAdd);
        }

        if(verticalBannersToAdd.length > 0){
            setVerticalBanners(verticalBannersToAdd);
        }
    }

    useEffect(() => {
        getTournamentData();
    }, []);

    useEffect(()=>{
        getBanners(tournamentData);
    },[tournamentData]);

    const changeTab = (valor)=>{
        switch (valor) {
            case 'INFORMATION':
                navigate(`/tournament/${tournamentId}/info`);
                break;
            case 'PARTICIPANTS':
                navigate(`/tournament/${tournamentId}/participants`);
                break;
            case 'PHASES':
                navigate(`/tournament/${tournamentId}/phases`);
                break;
            case 'CALENDAR':
                navigate(`/tournament/${tournamentId}/calendar`);
                break;
            case 'SPONSORS':
                navigate(`/tournament/${tournamentId}/sponsors`);
                break;
            default:
                navigate(`/tournament/${tournamentId}`);
        }
    }

    const inscribirUsuario = async () => {
       let result = await tournamentService.inscribirUsuario(tournamentId,JSON.parse(localStorage.getItem("user")).uid)

        if(result.code === 200){
            await getTournamentData();
            showAlert(result.msg, "success");
        }else if(result.code === 400) {
            showAlert(result.msg, "error");
        }
    }

    const darBajaUsuario = async () => {
        let result = await tournamentService.darBajaUsuario(tournamentId,JSON.parse(localStorage.getItem("user")).uid)

        if(result.code === 200){
            await getTournamentData();
            showAlert(result.msg, "success");
        }else if(result.code === 400) {
            showAlert(result.msg, "error");
        }
    }

    const dejarDePatrocinarTorneo = async () => {
        let result = await tournamentService.dejarDePatrocinarTorneo(tournamentId, JSON.parse(localStorage.getItem("user")).uid);
        if(result.code === 200){
            await getTournamentData();
            showAlert(result.msg,"success");
        }else if(result.code === 400) {
            showAlert(result.msg,"error");
        }
    }

    const eliminarPatrocinio = async (sponsorId) => {
        let result = await tournamentService.dejarDePatrocinarTorneo(tournamentId, sponsorId);
        if(result.code === 200){
            await getTournamentData();
            showAlert(result.msg,"success");
        }else if(result.code === 400) {
            showAlert(result.msg,"error");
        }
    }

    const aprobarPatrocinio = async (sponsorId) => {
        let result = await tournamentService.aprobarPatrocinio(tournamentId, sponsorId);
        if(result.code === 200){
            await getTournamentData();
            showAlert(result.msg,"success");
        }else if(result.code === 400) {
            showAlert(result.msg,"error");
        }
    }

    const getContext = () => {
        switch(JSON.parse(localStorage.getItem("user")).role){
            case "ADMIN":
                return {
                    "info": {
                        tournamentId: tournamentId,
                        inscribirUsuario: inscribirUsuario,
                        darBajaUsuario: darBajaUsuario,
                        dejarDePatrocinarTorneo: dejarDePatrocinarTorneo
                    },
                    "participants": {
                        tournamentId: tournamentId,
                    },
                    "phases": {
                        tournamentId: tournamentId,
                    },
                    "sponsors": {
                        tournamentId: tournamentId,
                        eliminarPatrocinio: eliminarPatrocinio,
                        aprobarPatrocinio: aprobarPatrocinio
                    }
                }
            default:
                return {
                    "info": {
                        tournamentId: tournamentId,
                        inscribirUsuario: inscribirUsuario,
                        darBajaUsuario: darBajaUsuario,
                        dejarDePatrocinarTorneo: dejarDePatrocinarTorneo
                    },
                    "participants": {
                        tournamentId: tournamentId,
                    },
                    "phases": {
                        tournamentId: tournamentId,
                    }
                }
        }
    }

    const getMenuOptions = () => {
        switch(JSON.parse(localStorage.getItem("user")).role){
            case "ADMIN":
                return [
                    {
                        type: "simple",
                        name: "Información",
                        onClick: () => changeTab("INFORMATION"),
                        icon: faFileLines
                    },
                    {
                        type: "simple",
                        name: "Participantes",
                        onClick: () => changeTab("PARTICIPANTS"),
                        icon: faUsers
                    },
                    {
                        type: "simple",
                        name: "Fases",
                        onClick: () => changeTab("PHASES"),
                        icon: faSitemap,
                        iconRotation: 90
                    },
                    {
                        type: "simple",
                        name: "Patrocinadores",
                        onClick: () => changeTab("SPONSORS"),
                        icon: faCalendar
                    }
                ]
            default:
                return [
                    {
                        type: "simple",
                        name: "Información",
                        onClick: () => changeTab("INFORMATION"),
                        icon: faFileLines
                    },
                    {
                        type: "simple",
                        name: "Participantes",
                        onClick: () => changeTab("PARTICIPANTS"),
                        icon: faUsers
                    },
                    {
                        type: "simple",
                        name: "Fases",
                        onClick: () => changeTab("PHASES"),
                        icon: faSitemap,
                        iconRotation: 90
                    }
                ]
        }
    }

    return (
        <>
            <div className="main">
                {
                    verticalBanners ?
                        <div className="patro-lateral-izquierdo">
                            <VerticalBanner images={verticalBanners}/>
                        </div>
                        :
                        <></>
                }

                <div className="tournament-view-page">
                    <div className="flex vertical gap-medium">
                        <div className="card">
                            <div className="card-content relative">
                                <div className="background-img">
                                    <img src={images("./"+ game._name + "_1300_350.png")} alt="" />
                                </div>
                                <div className="nombre-torneo">
                                    {tournamentData.name}
                                </div>
                            </div>
                        </div>
                        <MenuOptions options={getMenuOptions()} />
                        {
                            horizontalBanners ?
                                <div className="patro-horizontal">
                                    <HorizontalBanner images={horizontalBanners}/>
                                </div>
                                :
                                <></>
                        }
                        <Outlet context={getContext()[menuTab]} />
                    </div>
                </div>
                {
                    verticalBanners ?
                        <div className="patro-lateral-derecho">
                            <VerticalBanner images={verticalBanners}/>
                        </div>
                        :
                        <></>

                }
            </div>
        </>
    );

}

export default TournamentDetails;