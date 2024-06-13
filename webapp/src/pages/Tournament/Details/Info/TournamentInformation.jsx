import { images } from "../../../../helpers/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import {useNavigate, useOutletContext} from "react-router";
import TournamentPrize from "./TournamentPrize";
import tournamentService from "../../../../services/tournamentService";
import gameService from "../../../../services/gameService";
import prizeService from "../../../../services/prizeService";
import userService from "../../../../services/userService";

function TournamentInformation(props) {

    const { tournamentId, dejarDePatrocinarTorneo, inscribirUsuario, darBajaUsuario } = useOutletContext();
    const navigate = useNavigate();

    const [tournamentData, setTournamentData] = useState(undefined);
    const [game, setGame] = useState(undefined);
    const [prizes, setPrizes] = useState(undefined);

    useEffect(() => {
        getTournamentData();
    }, [tournamentId])

    const getTournamentData = async () => {
        let tournamentResult = await tournamentService.getTournament(tournamentId);
        let gameResult = await gameService.getGame(tournamentResult.game);

        setPrizes(await getPrizes(tournamentResult));
        setTournamentData(tournamentResult);
        setGame(gameResult);
    }

    const getPrizes = async (tournamentInfo) => {
        let prizesToAdd = []

        if(tournamentInfo.prize) {
            let prizeInfo = await prizeService.getPrize(tournamentInfo.prize);
            let user = await userService.getUser(tournamentInfo.creator);
            let prizeToAdd = {
                prize: prizeInfo,
                owner: user.name
            }
            prizesToAdd.push(prizeToAdd);
        }

        if(tournamentInfo.sponsoredBy) {
            for(let sponsor of tournamentInfo.sponsoredBy) {
                if(sponsor.status !== "PENDING") {
                    let prizeInfo = await prizeService.getPrize(sponsor.prize);
                    let user = await userService.getUser(sponsor.id);
                    let prizeToAdd = {
                        prize: prizeInfo,
                        owner: user.name
                    }
                    prizesToAdd.push(prizeToAdd);
                }
            }
        }

        return prizesToAdd;
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Información
                </div>
                <div className="card-content">
                    <div className="size-content">
                        <div className="flex no-wrap align-spread">
                            <div className="flex vertical size-3-4 spacing-large">
                                <div className="flex vertical gap-medium size-content">
                                    <div className="flex size-content">
                                        <h2>Descripción</h2>
                                    </div>
                                    {
                                        tournamentData === undefined ? <p>Este torneo no dispone de descripción</p>
                                            : tournamentData.description === "" ? <p>Este torneo no dispone de descripción</p>
                                            : tournamentData.description.split("\n").map((element,index) => <p key={index}>{element}</p>)
                                    }
                                </div>
                                <div className="flex vertical gap-medium size-content">

                                    <div className="flex size-content">
                                        <h2>Reglas</h2>
                                    </div>
                                    {
                                        tournamentData === undefined ? <p>Este torneo no dispone de reglas</p>
                                            : tournamentData.rules === "" ? <p>Este torneo no dispone de reglas</p>
                                            : tournamentData.rules.split("\n").map((rule,index) => <p key={index}>{rule}</p>)
                                    }
                                </div>
                                { prizes === undefined ?
                                    <div className="size-content">
                                        <div className="flex size-content ">
                                            <h2>Premios</h2>
                                        </div>
                                        <div className="flex size-1-1 spacing-medium">
                                            <p>Este torneo no dispone de premios</p>
                                        </div>
                                    </div>
                                    : prizes.length === 0 ?
                                        <div className="size-content">
                                            <div className="flex size-content mb-3">
                                                <h2>Premios</h2>
                                            </div>
                                            <div className="flex size-1-1 spacing-medium">
                                                <p>Este torneo no dispone de premios</p>
                                            </div>
                                        </div>
                                        :
                                        <div className="size-content">
                                            <div className="flex size-content mb-3">
                                                <h2>Premios</h2>
                                            </div>
                                            <div className="flex size-1-1 spacing-medium">
                                                {
                                                    prizes.map((prize,index) =>
                                                        prize.prize !== undefined ?
                                                            <div className="size-1-5">
                                                                <TournamentPrize key={index} prize={prize.prize}/>
                                                            </div>
                                                            :
                                                            <></>
                                                    )
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="flex align-top size-1-4">
                                <div className="flex gap-large align-end">
                                    <div className="flex gap-large align-middle align-center size-1-1">
                                        <div className={"flex align-center align-middle game-info size-4-5"}>
                                            <div className={"flex align-center align-middle game-info-header"}>
                                                <span>Juego</span>
                                            </div>
                                            {
                                                game !== undefined ?
                                                    <img className="" src={images("./" + game._name + "_torneo.jpg")} alt={"Icono " + game.name} />
                                                    :
                                                    <img src={images("./DEFAULT_torneo.jpg")} alt="Icono por defecto torneo" />
                                            }
                                        </div>
                                    </div>
                                    {
                                        tournamentData !== undefined ?
                                            <div className="flex align-center align-middle spacing-small size-1-1">
                                                <FontAwesomeIcon icon={faUser} />
                                                <span>{tournamentData.participants.length}/{tournamentData.size + " "} Participantes</span>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className="flex align-center align-middle spacing-small size-1-1">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                        <span>Online</span>
                                    </div>
                                    <div className="flex align-center align-middle size-1-1">
                                        {

                                            tournamentData !== undefined && JSON.parse(localStorage.getItem("user")).role === "USER" && tournamentData.status === "INSCRIPTIONS_OPEN" ?
                                                !tournamentData.participants.find((participant)=>participant.id === JSON.parse(localStorage.getItem("user")).uid) ?
                                                    tournamentData.participants.length < tournamentData.size ?
                                                        <div className="flex size-4-5 accept">
                                                            <button onClick={inscribirUsuario}>
                                                                Inscribirse
                                                            </button>
                                                        </div>
                                                        :
                                                        <></>
                                                    :
                                                    <div className="flex size-4-5 delete">
                                                        <button onClick={darBajaUsuario}>
                                                            Darse de baja
                                                        </button>
                                                    </div>
                                                :
                                                <></>
                                        }
                                        {
                                            tournamentData !== undefined && JSON.parse(localStorage.getItem("user")).role === "COMPANY" ?
                                            !tournamentData.sponsoredBy.find((sponsor) => sponsor.id === JSON.parse(localStorage.getItem("user")).uid) ?
                                                <div className="flex size-4-5 accept">
                                                    <button onClick={()=>navigate('/sponsor/' + tournamentId)}>
                                                        Patrocinar
                                                    </button>
                                                </div>
                                                :
                                                <div className="flex size-4-5 delete">
                                                    <button onClick={dejarDePatrocinarTorneo}>
                                                            Dejar de patrocinar
                                                    </button>
                                                </div>
                                            :
                                            <></>
                                        }
                                        {
                                            tournamentData !== undefined && JSON.parse(localStorage.getItem("user")).role === "ADMIN" && JSON.parse(localStorage.getItem("user")).uid === tournamentData.creator ?
                                                <div className="flex size-4-5 accept">
                                                    <button onClick={()=>navigate('/tournament/' + tournamentId +'/edit/')}>
                                                            Editar
                                                    </button>
                                                </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"card-footer"}>

                </div>
            </div>
        </>
    );
}

export default TournamentInformation;
