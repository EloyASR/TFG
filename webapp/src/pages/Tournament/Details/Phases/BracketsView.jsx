import { Fragment, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import userService from "../../../../services/userService";
import SeriesEdit from "./SeriesEdit";
import serieService from "../../../../services/serieService";
import SeriesInfo from "./SeriesInfo";

function BracketsView({tournamentData,
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
        console.log("Actualizando Bracket View");
        establishData();
    }, [tournamentData]);

    const establishData  = async () =>{
        await getRoundsData();
        await getParticipantsWithNames();
    }

    const getRoundsData = async function () {

        setRoundsData(undefined);

        let newRounds = [...tournamentData.phases[phaseNumber].bracketData.rounds];

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
                        bestOf: tournamentData.phases[phaseNumber].bracketData.bestOf,
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
                            bestOf: tournamentData.phases[phaseNumber].bracketData.bestOf,
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

    const getParticipantsWithNames = async () => {

        let newParticipantsTransform = []

        if (phaseNumber === 0) {
            for (let participant of tournamentData.participants) {

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
        } else {
            switch (tournamentData.phases[phaseNumber - 1].formatType) {
                case "LEAGUE_PHASE":
                    for( let participant of tournamentData.participants.filter(p=>tournamentData.phases[phaseNumber-1].leagueData.topParticipants.includes(p.id))){
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
                    break;
                default:
                    break;
            }
        }
    }

    const getName = (id) => {
        let participant = participantsWithName.find((participant) => participant.id === id);
        if(participant){
            return participant.name;
        }else {
            return "TBD";
        }
    }

    const calculateWidthDisplay = function (rounds) {
        return rounds * 300;
    }

    const allPreviousRoundSeriesEnded = (serie) => {
        if(serie.roundNumber === 0) {
            return true;
        }else{
            return roundsData[serie.home_participant_parent_round].series[serie.home_participant_parent_serie].serieData.status === "FINISHED"
                || roundsData[serie.away_participant_parent_round].series[serie.away_participant_parent_serie].serieData.status === "FINISHED"
        }
    }

    const participantsNotYetSelected = (serieSelected) => {
        let listOfParticipantsNotYetSelected = [];

        for(let participant of participantsWithName) {

            let result = roundsData[0].series.find((serie) =>
                serieSelected.serieNumber !== serie.serieNumber
                && ( serie.serieData.home_participant === participant.id || serie.serieData.away_participant === participant.id))

            if(!result){
                listOfParticipantsNotYetSelected.push(participant);
            }
        }

        console.log(listOfParticipantsNotYetSelected)
        return listOfParticipantsNotYetSelected;
    }

    const listOfParticipants = (serie) => {

        let participantsToSelect = []

        if(serie.roundNumber === 0){
            return participantsNotYetSelected(serie);
        }else{
            if(roundsData[serie.home_participant_parent_round].series[serie.home_participant_parent_serie].serieData.status === "FINISHED"
                || roundsData[serie.away_participant_parent_round].series[serie.away_participant_parent_serie].serieData.status === "FINISHED"){

                if(roundsData[serie.home_participant_parent_round].series[serie.home_participant_parent_serie].serieData.result.winner){
                    participantsToSelect.push(participantsWithName.find((participant) => participant.id === roundsData[serie.home_participant_parent_round].series[serie.home_participant_parent_serie].serieData.result.winner));
                }
                if(roundsData[serie.away_participant_parent_round].series[serie.away_participant_parent_serie].serieData.result.winner){
                    participantsToSelect.push(participantsWithName.find((participant) => participant.id === roundsData[serie.away_participant_parent_round].series[serie.away_participant_parent_serie].serieData.result.winner));
                }
                return participantsToSelect;
            }else {
                return [];
            }
        }
    }

    const onOpenShowSerieInfo = (serie) => {
        setSelectedSerie(serie);
        setShowSeriesInfo(true);
    }

    const onCloseShowSerieInfo = () => {
        setSelectedSerie(undefined);
        setShowSeriesInfo(false);
    }

    const onOpenModifySeries = (serie) => {
        setSelectedSerie(serie);
        setShowSeriesEdit(true);
    }

    const onCloseModifySerie = () => {
        setSelectedSerie(undefined);
        setShowSeriesEdit(false);
    }

    return (
        <>
            <div className="flex overflow-hidden size-1-1">
                {
                    roundsData ?
                        <div className="inline-block scrollbar overflow-y-scroll overflow-x-auto size-1-1 bracket">
                            <div className={"flex width-" + calculateWidthDisplay(roundsData.length) + " brackets-rounds-menu"}>
                                {
                                    roundsData.map((round, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div
                                                    className={"flex align-center bracket-rounds-menuitem size-1-" + roundsData.length}>
                                                    <div className="flex align-center">
                                                        ROUND {round.roundNumber}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })
                                }
                            </div>
                            <div className={"flex width-" + calculateWidthDisplay(roundsData.length) + " brackets-rounds-body"}>
                                {
                                    roundsData.map((round, roundIndex) => {
                                        return (
                                            <Fragment key={roundIndex}>
                                                <div className={"size-1-" + roundsData.length}>
                                                    <div className="flex vertical align-around brackets-rounds-column">
                                                        {
                                                            round.series.map((serie, serieIndex) => {
                                                                return (
                                                                    <Fragment key={serieIndex}>
                                                                        <div
                                                                            className="flex vertical brackets-rounds-match">
                                                                            <div
                                                                                className="flex align-spread brackets-rounds-match-team">
                                                                                <div>
                                                                                    {
                                                                                        serie.serieData.home_participant ? getName(serie.serieData.home_participant) : "TBD"
                                                                                    }
                                                                                </div>
                                                                                <div
                                                                                    className="brackets-rounds-match-team-result">
                                                                                    {serie.serieData.result.home_result ? serie.serieData.result.home_result : 0}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="flex align-spread brackets-rounds-match-team">
                                                                                <div>
                                                                                    {
                                                                                        serie.serieData.away_participant ? getName(serie.serieData.away_participant) : "TBD"
                                                                                    }
                                                                                </div>
                                                                                <div
                                                                                    className="brackets-rounds-match-team-result">
                                                                                    {serie.serieData.result.away_result ? serie.serieData.result.away_result : 0}
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                allPreviousRoundSeriesEnded(serie) &&
                                                                                JSON.parse(localStorage.getItem("user")).role === "ADMIN" &&
                                                                                JSON.parse(localStorage.getItem("user")).uid === tournamentData.creator &&
                                                                                tournamentData.currentPhase === phaseNumber &&
                                                                                (tournamentData.status === "INSCRIPTIONS_CLOSED" || tournamentData.status === "ON_COURSE") ?
                                                                                    <button
                                                                                        className="brackets-rounds-match-modify"
                                                                                        onClick={() => onOpenModifySeries(serie)}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faPenToSquare}
                                                                                            size="xl"/>
                                                                                    </button>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                            {
                                                                                JSON.parse(localStorage.getItem("user")).role === "USER" ?
                                                                                    <button
                                                                                        className="brackets-rounds-match-modify"
                                                                                        onClick={() => onOpenShowSerieInfo(serie)}>
                                                                                        <FontAwesomeIcon icon={faEye}
                                                                                                         size="xl"/>
                                                                                    </button>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </div>
                                                                    </Fragment>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        :
                        <></>
                }
            </div>
            {
                selectedSerie !== undefined && showSeriesEdit ?
                    <SeriesEdit
                        tournamentId={tournamentData.uid}
                        phase={phaseNumber}
                        tournamentStatus={tournamentData.status}
                        phaseFormatType={"BRACKET_PHASE"}
                        functionClose={onCloseModifySerie}
                        serie={selectedSerie}
                        listOfParticipants={listOfParticipants}
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

export default BracketsView;