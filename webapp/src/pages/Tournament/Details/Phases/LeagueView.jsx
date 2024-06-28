import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faEye, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import userService from "../../../../services/userService";
import SeriesEdit from "./SeriesEdit";
import serieService from "../../../../services/serieService";
import SeriesInfo from "./SeriesInfo";

function LeagueView({tournamentData,
                          phaseNumber,
                          updateData}) {

    //VARIABLES DE CONDICIÓN MODALES
    const [showSeriesEdit, setShowSeriesEdit] = useState(false);
    const [showSeriesInfo, setShowSeriesInfo] = useState(false);

    //VARIABLES DE DATOS
    const [roundsData, setRoundsData] = useState(undefined);

    //DATOS DE EDICIÓN DE SERIE
    const [selectedSerie, setSelectedSerie] = useState(undefined);

    const [participantsWithName, setParticipantsWithName] = useState([])

    useEffect(() => {
        establishData();
    }, [tournamentData]);


    const establishData  = async () =>{
        await getRoundsData();
        await getParticipantsWithNames();
    }

    const getRoundsData = async function () {

        setRoundsData(undefined);

        let newRounds = [...tournamentData.phases[phaseNumber].leagueData.rounds];

        //NOS MOVEMOS POR LAS RONDAS
        for (let round of newRounds) {
            //NOS MOVEMOS POR LAS SERIES
            for (let serie of round.series) {
                //PARA CADA SERIE AÑADIMOS SUS DATOS
                if(serie.identifier === undefined){
                    serie.serieData = {
                        type: "SINGLE",
                        mode: tournamentData.mode,
                        game: tournamentData.game,
                        bestOf: tournamentData.phases[phaseNumber].leagueData.bestOf,
                        home_participant: undefined,
                        away_participant: undefined,
                        result: {
                            winner:undefined,
                            loser:undefined,
                            winner_result:undefined,
                            loser_result:undefined,
                            matches:[]
                        },
                        status: "SCHEDULED"
                    }
                }else{
                    let serieFound = await serieService.getSerie(serie.identifier);
                    if (!serieFound) {
                        serie.serieData = {
                            type: "SINGLE",
                            mode: tournamentData.mode,
                            game: tournamentData.game,
                            bestOf: tournamentData.phases[phaseNumber].leagueData.bestOf,
                            home_participant: undefined,
                            away_participant: undefined,
                            result: {
                                winner:undefined,
                                loser:undefined,
                                winner_result:undefined,
                                loser_result:undefined,
                                matches:[]
                            },
                            status: "SCHEDULED"
                        }
                    }else{
                        serie.serieData = {
                            ...serieFound
                        };
                    }
                }
            }
        }
        setRoundsData(newRounds);
    }

    const getParticipants = () => {
        if(phaseNumber === 0) {
            return tournamentData.participants;
        }else {
            switch(tournamentData.phases[phaseNumber-1].formatType){
                case "LEAGUE_PHASE":
                    return tournamentData.participants.filter((participant) => tournamentData.phases[phaseNumber-1].leagueData.topParticipants.includes(participant.id));
                default:
                    return [];
            }
        }
    }

    const getParticipantsWithNames = async () => {

        let newParticipantsTransform = []

        for(let participant of getParticipants()){

            let user = await userService.getUser(participant.id);

            newParticipantsTransform.push(
                {
                    id: participant.id,
                    type: participant.participantType,
                    status: participant.status,
                    name: user.name
                }
            )
        }
        setParticipantsWithName(newParticipantsTransform);
    }

    const getName = (id) => {
        let participant = participantsWithName.find((participant) => participant.id === id);
        if(participant){
            return participant.name;
        }else {
            return "TBD";
        }
    }

    const onOpenShowSerieInfo = (serie) => {
        setSelectedSerie(serie);
        setShowSeriesInfo(true);
        document.body.style.overflow = "hidden";
    }

    const onCloseShowSerieInfo = () => {
        setSelectedSerie(undefined);
        setShowSeriesInfo(false);
        document.body.style.overflow = "auto";
    }

    const onOpenModifySeries = (serie) => {
        setSelectedSerie(serie);
        setShowSeriesEdit(true);
        document.body.style.overflow = "hidden";
    }

    const onCloseModifySerie = () => {
        setSelectedSerie(undefined);
        setShowSeriesEdit(false);
        document.body.style.overflow = "auto";
    }

    const winnerLoser = (serieData) => {
        let results = [];

        if(serieData.serieData.result.winner) {
            if(serieData.serieData.result.winner === serieData.serieData.home_participant) {
                results[0] = "win";
            }else{
                results[0] = "lose";
            }

            if(serieData.serieData.result.winner === serieData.serieData.away_participant) {
                results[1] = "win";
            }else{
                results[1] = "lose";
            }
        }else{
            results = ["draw", "draw"];
        }



        return results;
    }

    const Serie = ({serieData}) => {

        return <div className={"league-round-serie flex horizontal"}>
            <div className={"home flex horizontal size-1-2 align-spread"}>
                <div className={winnerLoser(serieData)[0] === "win" ? "name size-all winner" : winnerLoser(serieData)[0] === "lose" ? "name size-all loser" : "name size-all"}>
                    {
                        serieData.serieData.home_participant ? getName(serieData.serieData.home_participant) : "TBD"
                    }
                </div>
                <div className={winnerLoser(serieData)[0] === "win" ?
                    "result flex vertical align-center winner"
                    : winnerLoser(serieData)[0] === "lose" ?
                        "result flex vertical align-center loser"
                        : "result flex vertical align-center"}>
                    {
                        serieData.serieData.result.home_result ? serieData.serieData.result.home_result : 0
                    }
                </div>
            </div>
            <div className={"away flex horizontal size-1-2 align-spread"}>
                <div className={winnerLoser(serieData)[1] === "win" ?
                    "result flex vertical align-center winner"
                    : winnerLoser(serieData)[1] === "lose" ?
                        "result flex vertical align-center loser"
                        : "result flex vertical align-center"}>
                    {
                        serieData.serieData.result.away_result ? serieData.serieData.result.away_result : 0
                    }
                </div>
                <div className={winnerLoser(serieData)[1] === "win" ? "name size-all winner" : winnerLoser(serieData)[1] === "lose" ? "name size-all loser" : "name size-all"}>
                    {
                        serieData.serieData.away_participant ? getName(serieData.serieData.away_participant) : "TBD"
                    }
                </div>
            </div>
            {
                JSON.parse(localStorage.getItem("user")).role === "ADMIN" &&
                JSON.parse(localStorage.getItem("user")).uid === tournamentData.creator &&
                tournamentData.currentPhase === phaseNumber &&
                (tournamentData.status === "INSCRIPTIONS_CLOSED" || tournamentData.status === "ON_COURSE")?
                    <button
                        className="league-rounds-match-modify"
                        onClick={() => {onOpenModifySeries(serieData)}}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}/>
                    </button>
                    :
                    <></>
            }
            {
                JSON.parse(localStorage.getItem("user")).role === "USER" ?
                    <button
                        className="league-rounds-match-modify"
                        onClick={()=>{onOpenShowSerieInfo(serieData)}}>
                        <FontAwesomeIcon icon={faEye}/>
                    </button>
                    :
                    <></>
            }
        </div>
    }

    const Round = ({roundData, number}) => {

        const [open, setOpen] = useState(false);

        return <div className={"flex vertical size-1-1 align-middle league-round "}>
            <div className={"flex horizontal league-round-header align-middle"}>
                <div className={"flex align-center size-all"}>
                    <span>RONDA {number+1}</span>
                </div>
                {
                    open ?
                        <button onClick={() => setOpen(false)}><FontAwesomeIcon icon={faAngleUp}/></button>
                        :
                        <button onClick={()=>setOpen(true)}><FontAwesomeIcon icon={faAngleDown}/></button>
                }
            </div>
            <div className={"league-round-content size-1-1"}>
            {
                open ?
                    roundData.series.map((s, index) =>
                        <Fragment key={index}>
                            <Serie serieData={s}/>
                        </Fragment>
                    )
                    :
                    <></>
            }
            </div>
        </div>
    }

    const passParticipant = (rowData, index) => {
        if(phaseNumber < tournamentData.phases.length-1) {
            switch (tournamentData.phases[phaseNumber+1].formatType){
                case "LEAGUE_PHASE":
                    return tournamentData.phases[phaseNumber+1].leagueData.size > index
                case "BRACKET_PHASE":
                    return tournamentData.phases[phaseNumber+1].bracketData.size > index
                default:
                    return false;
            }
        }else{
            return rowData.position === 1;
        }
    }

    const OverviewRow = ({rowData, index}) => {
        return <>
            <tr className={"overview-row"}>
                {
                    passParticipant(rowData, index) ?
                        <td className={"position pass"}>{rowData.position}</td>
                        :
                        <td className={"position"}>{rowData.position}</td>
                }
                <td className={"name"}>{rowData.participant ? rowData.participant.name : "TBD"}</td>
                <td className={"points"}>
                    {
                        rowData.wins * tournamentData.phases[phaseNumber].leagueData.winPoints
                    }
                </td>
                <td className={"win-losses"}>
                    {rowData.wins} - {rowData.losses}
                </td>
                <td className={"percentage"}>
                    {
                        rowData.wins !== 0 ?
                            Math.floor(rowData.wins/(rowData.wins+rowData.losses) * 100) + "%"
                            :
                            "0%"
                    }
                </td>
            </tr>
        </>
    }

    const getResults = () => {

        let results = []

        for(let i = 0; i < tournamentData.phases[phaseNumber].leagueData.size; i++){
            results.push({
                participant: participantsWithName[i],
                wins: 0,
                losses: 0,
            })
        }

        roundsData.forEach((round) => {
            round.series.forEach((serie) => {
                let winner = serie.serieData.result.winner;
                let loser = undefined;

                if (serie.serieData.away_participant === winner) {
                    loser = serie.serieData.home_participant;
                }

                if (serie.serieData.home_participant === winner) {
                    loser = serie.serieData.away_participant;
                }

                if (winner) {
                    let index = results.findIndex(result => result.participant !== undefined && result.participant.id === winner)
                    if (index !== -1) {
                        results[index].wins += 1;
                    }
                }

                if (loser) {
                    let index = results.findIndex(result => result.participant !== undefined && result.participant.id === loser)
                    if (index !== -1) {
                        results[index].losses += 1;
                    }
                }
            });
        });

        results.sort((a, b) => {
            if (b.wins !== a.wins) {
                return b.wins - a.wins;
            } else {
                const aGames = a.wins + a.losses;
                const bGames = b.wins + b.losses;
                return bGames - aGames; // Order by number of games played (descending)
            }
        });

        // Asignar posiciones
        let currentPosition = 1;

        for (let i = 0; i < results.length; i++) {
            if (i > 0 && (results[i].wins === results[i - 1].wins && (results[i].wins + results[i].losses) === (results[i - 1].wins + results[i - 1].losses))) {
                // Si el actual tiene los mismos resultados que el anterior, asignar la misma posición
                results[i].position = results[i - 1].position;
            } else {
                // Asignar la posición actual y actualizar la posición para el siguiente
                results[i].position = currentPosition;
            }
            currentPosition++;
        }

        return results;
    }

    return (
        <>
            <div className="flex size-1-1 gap-large">
                {
                    roundsData ?
                        <>
                            <div className="flex size-1-1">
                                <div className={"league-overview"}>
                                    <table className={"league-overview-table"}>
                                        <thead>
                                        <tr className={"league-overview-header"}>
                                            <th colSpan={5}>
                                                {
                                                    tournamentData.phases[phaseNumber].phaseName
                                                }
                                            </th>
                                        </tr>
                                        <tr className={"league-overview-secondary-header"}>
                                            <th></th>
                                            <th>Participante</th>
                                            <th>Puntos</th>
                                            <th colSpan={2}>Partidos</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            getResults().map((result, index) => <OverviewRow key={"overview-row-" + index} rowData={result} index={index}/>)
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex spacing-large size-all">
                                {
                                    roundsData.map((roundData, index) => {
                                        return <div key={"round-" + index } className={"size-1-2"}><Round roundData={roundData} number={index}/></div>
                                    })
                                }
                            </div>
                        </>
                        :
                        <></>
                }
            </div>
            {
                selectedSerie !== undefined && showSeriesEdit ?
                    <SeriesEdit
                        tournamentId={tournamentData.uid}
                        phase={phaseNumber}
                        phaseFormatType={"LEAGUE_PHASE"}
                        tournamentStatus={tournamentData.status}
                        functionClose={onCloseModifySerie}
                        serie={selectedSerie}
                        rounds={roundsData}
                        listOfParticipants={participantsWithName}
                        updateData={updateData}/>
                    :
                    <></>
            }
            {
                selectedSerie !== undefined && showSeriesInfo ?
                    <>
                        <SeriesInfo
                            serie={selectedSerie}
                            onClose={onCloseShowSerieInfo}/>
                    </>
                    :
                    <></>
            }

        </>
    );
}

export default LeagueView;