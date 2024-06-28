import Combobox from "../../List/Combobox";
import React, {useEffect, useState} from "react";
import InputNumber from "../../../components/InputNumber";
import InputText from "../../../components/InputText";
import HorizontalSpliter from "../../../components/HorizontalSpliter";
import userService from "../../../../services/userService";
import serieService from "../../../../services/serieService";
import {useAlert} from "../../../../context/AlertContext";
import tournamentService from "../../../../services/tournamentService";
import matchService from "../../../../services/matchService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

function SeriesEdit({tournamentId,
                        tournamentStatus,
                        phase,
                        phaseFormatType,
                        serie,
                        listOfParticipants,
                        functionClose,
                        updateData,
                        rounds}) {

    const {showAlert} = useAlert();
    const [seriesData, setSeriesData] = useState(undefined);
    const [participantsToSelect, setParticipantsToSelect] = useState([])
    const [homeParticipantSelected, setHomeParticipantSelected] = useState(undefined)
    const [awayParticipantSelected, setAwayParticipantSelected] = useState(undefined)
    const [scoreHome, setScoreHome] = useState(0);
    const [scoreAway, setScoreAway] = useState(0);
    const [selectedWinner, setSelectedWinner] = useState(undefined);
    const [status, setStatus] = useState("Programado");
    const [matches, setMatches] = useState([]);
    const [bestOf, setBestOf] = useState(1);

    useEffect(()=>{
        getSeriesData();
        setParticipants();
    },[])

    const statusList = [
        {
            name: "Programado",
            _name: "SCHEDULED"
        },
        {
            name: "En juego",
            _name: "IN_GAME"
        },
        {
            name: "Finalizado",
            _name: "FINISHED"
        }
    ]

    const getSeriesData = async () =>  {

        let newSeriesData = {};

        if(serie) {
            newSeriesData = {...serie};
            setScoreHome(serie.serieData.result.home_result);
            setScoreAway(serie.serieData.result.away_result);
            setBestOf(serie.serieData.bestOf);
        }else{
            newSeriesData = {
                serieNumber: -1,
                roundNumber: -1,
                home_participant_parent_round: -1,
                home_participant_parent_serie: -1,
                away_participant_parent_round: -1,
                away_participant_parent_serie: -1,
                next_round: -1,
                next_serie: -1,
                serieData: {
                    uid: undefined,
                    type: "SINGLE",
                    mode: "",
                    game: "",
                    bestOf: 1,
                    home_participant: undefined,
                    away_participant: undefined,
                    result: {
                        winner: "",
                        loser: "",
                        winner_result: 0,
                        loser_result: 0,
                        matches: []
                    },
                    status: "SCHEDULED"
                }
            }
        }

        let matchesModified = [];

        for(let match of serie.serieData.result.matches){

            let result = await matchService.getMatch(match);

            if(result !== undefined) {
                matchesModified.push({
                    id: match,
                    type: result.type,
                    mode: result.mode,
                    game: result.game,
                    matchData: result.matchData
                })
            }else{
                matchesModified.push({
                    id: undefined,
                    type: serie.serieData.type,
                    mode: serie.serieData.mode,
                    game: serie.serieData.game,
                    matchData: {}
                })
            }
        }

        setMatches(matchesModified);
        setStatus(getStatusByPrivateName(newSeriesData.serieData.status));
        setSeriesData(newSeriesData);
    }

    const setParticipants = async () => {

        let newParticipantsTransform = []

        switch(phaseFormatType) {
            case "LEAGUE_PHASE":
                newParticipantsTransform = listOfParticipants;
                setParticipantsToSelect(listOfParticipants)
                break;
            case "BRACKET_PHASE":
                newParticipantsTransform = await setBracketPhaseParticipants();
                break;
            default:
                newParticipantsTransform = [];
                break;
        }

        let homeParticipant = newParticipantsTransform.find((participant) => participant.id === serie.serieData.home_participant)
        if (homeParticipant) {
            setHomeParticipantSelected(homeParticipant);
        } else {
            setHomeParticipantSelected(undefined);
        }

        let awayParticipant = newParticipantsTransform.find((participant) => participant.id === serie.serieData.away_participant)
        if (awayParticipant) {
            setAwayParticipantSelected(awayParticipant);
        } else {
            setAwayParticipantSelected(undefined);
        }

        let winnerParticipant = newParticipantsTransform.find((participant) => participant.id === serie.serieData.result.winner)
        if (winnerParticipant) {
            setSelectedWinner(winnerParticipant);
        } else {
            setSelectedWinner(undefined);
        }
    }

    const setBracketPhaseParticipants = async () => {

        let newParticipantsTransform = []

        for (let participant of listOfParticipants(serie)) {

            if (participant !== undefined) {
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
        }

        setParticipantsToSelect(newParticipantsTransform);

        return newParticipantsTransform;
    }

    const getParticipantWithName = (name) => {
        let participant = participantsToSelect.find((participante) => participante.name === name);
        if(participant){
            return participant;
        }else {
            return {};
        }
    }

    const getParticipantsNotSelected = (round, participantPosition) => {

        switch (phaseFormatType) {
            case "LEAGUE_PHASE":
                return getParticipantsNotSelectedLeaguePhase(round, participantPosition);
            case "BRACKET_PHASE":
                return getParticipantsNotSelectedBracketPhase();
            default:
                return [];
        }
    }

    const getParticipantSeriesNotPlayed = (participants, participant) => {

        let seriesPlayed = []

        rounds.forEach((round, rIndex) => {
            if(rIndex !== seriesData.roundNumber) {
                round.series.forEach((serie) => {
                    if (serie.serieData.home_participant === participant.id) {
                        if (serie.serieData.away_participant) {
                            seriesPlayed.push(serie.serieData.away_participant);
                        }
                    }

                    if (serie.serieData.away_participant === participant.id) {
                        if (serie.serieData.home_participant) {
                            seriesPlayed.push(serie.serieData.home_participant);
                        }
                    }
                })
            }
        })

        return participants.filter((participant) => !seriesPlayed.includes(participant.id));
    }

    const getParticipantsNotSelectedInRound = () => {

        let participantsSelected = []

        rounds[seriesData.roundNumber].series.forEach((serie,index) => {
            if(index !== seriesData.serieNumber) {
                if(serie.serieData.home_participant){
                    participantsSelected.push(serie.serieData.home_participant);
                }
                if(serie.serieData.away_participant){
                    participantsSelected.push(serie.serieData.away_participant);
                }
            }
        })

        return participantsToSelect.filter((participant) => !participantsSelected.includes(participant.id));
    }

    const getParticipantsNotSelectedLeaguePhase = (round, participantPosition) => {
        let listOfParticipantsNotSelected = [
            {
                name: "-- Sin participante --"
            }
        ]

        let participantsToAdd = []

        let participantsNotSelectedInRound = getParticipantsNotSelectedInRound();

        if(participantPosition === "away"){
            if(homeParticipantSelected) {
                participantsToAdd = getParticipantSeriesNotPlayed(participantsNotSelectedInRound, homeParticipantSelected);
            }
            else{
                participantsToAdd = participantsNotSelectedInRound;
            }
        }
        if(participantPosition === "home"){
            if(awayParticipantSelected) {
                participantsToAdd = getParticipantSeriesNotPlayed(participantsNotSelectedInRound, awayParticipantSelected);
            }else{
                participantsToAdd = participantsNotSelectedInRound;
            }
        }

        participantsToAdd.forEach((participant)=>{
            if(!(homeParticipantSelected && homeParticipantSelected.id === participant.id) && !(awayParticipantSelected && awayParticipantSelected.id === participant.id)) {
                listOfParticipantsNotSelected.push(participant);
            }
        })

        return listOfParticipantsNotSelected;
    }

    const getParticipantsNotSelectedBracketPhase = () => {
        let listOfParticipantsNotSelected = [
            {
                name: "-- Sin participante --"
            }
        ]

        participantsToSelect.forEach((participant) => {
            if(!(homeParticipantSelected && homeParticipantSelected.id === participant.id) && !(awayParticipantSelected && awayParticipantSelected.id === participant.id)){
                listOfParticipantsNotSelected.push(participant);
            }
        })

        return listOfParticipantsNotSelected;
    }

    const onChangeParticipantCombobox = async (home, away) => {
        if(home) {
            if(home === "-- Sin participante --") {
                setHomeParticipantSelected(undefined)
            }else {
                setHomeParticipantSelected(getParticipantWithName(home))
            }
        }

        if(away) {
            if(away === "-- Sin participante --") {
                setAwayParticipantSelected(undefined)
            }else {
                setAwayParticipantSelected(getParticipantWithName(away))
            }
        }
    }

    const onChangeWinnerCombobox = async (value) => {
        if(value === "-- Sin ganador --") {
            setSelectedWinner(undefined);
        }else{
            setSelectedWinner(getParticipantWithName(value));
        }
    }

    const getMaxScoreHomeParticipant = () => {

        switch(seriesData.serieData.bestOf){
            case 1:
                return scoreAway === 1 ? 0 : 1;
            case 3:
                return scoreAway === 2 ? 1 : 2;
            case 5:
                return scoreAway === 3 ? 2 : 3;
            default:
                return 0;
        }
    }

    const getMaxScoreAwayParticipant = () => {

        switch(seriesData.serieData.bestOf){
            case 1:
                return scoreHome === 1 ? 0 : 1;
            case 3:
                return scoreHome === 2 ? 1 : 2;
            case 5:
                return scoreHome === 3 ? 2 : 3;
            default:
                return 0;
        }
    }

    const getStatusByPublicName = (publicName) => {
        switch(publicName){
            case "Programado":
                return "SCHEDULED"
            case "En juego":
                return "IN_GAME"
            case "Finalizado":
                return "FINISHED"
            default:
                return "SCHEDULED"
        }
    }

    const getStatusByPrivateName = (privateName) => {
        switch(privateName){
            case "SCHEDULED":
                return "Programado"
            case "IN_GAME":
                return "En juego"
            case "FINISHED":
                return "Finalizado"
            default:
                return "Programado"
        }
    }

    const addMatch = () => {
        let newMatches = [...matches];
        newMatches.push({
            id: undefined,
            type: seriesData.serieData.type,
            mode: seriesData.serieData.mode,
            game: seriesData.serieData.game,
            serie: seriesData.serieData.uid,
            matchData: {}
        })
        setMatches(newMatches);
    }

    const getButtonAddMatches = () => {
        if(matches !== undefined && bestOf !== undefined && matches.length < bestOf){
            return true;
        }else {
            return false;
        }
    }

    const acceptChanges = async (e) => {
        //ELIMINAMOS EL EFECTO POR DEFECTO DEL SUBMIT
        e.preventDefault();

        let dataToSend = {};

        //ESTABLECEMOS LOS VALORES BASE
        dataToSend.type = seriesData.serieData.type
        dataToSend.mode = seriesData.serieData.mode
        dataToSend.game = seriesData.serieData.game
        dataToSend.bestOf = seriesData.serieData.bestOf

        //ESTABLECEMOS LOS PARTICIPANTES
        if(homeParticipantSelected) {
            dataToSend.home_participant = homeParticipantSelected.id
        }
        if(awayParticipantSelected) {
            dataToSend.away_participant = awayParticipantSelected.id
        }

        //ESTABLECEMOS LOS PARTIDOS
        let matchesResult = [];

        for(let match of matches) {
            let values = {
                type: match.type,
                mode: match.mode,
                game: match.game,
                serie: match.serie,
                matchData: match.matchData
            }

            if(match.id !== undefined){
                await matchService.updateMatch(match.id, {match:values});
                matchesResult.push(match.id);
            }else {
                let result = await matchService.createMatch(values);
                if(result.code === 200){
                    matchesResult.push(result.data.id);
                }
            }
        }

        //ESTABLECEMOS EL RESULTADO
        dataToSend.result = {

            home_result: scoreHome,
            away_result: scoreAway,
            matches: matchesResult,
        }

        if(selectedWinner !== undefined){
            dataToSend.result.winner=selectedWinner.id
        }

        //ESTABLECEMOS EL ESTADO
        dataToSend.status = getStatusByPublicName(status);

        //SI LA SERIE NO EXISTE LA CREAMOS Y LA AÑADIMOS AL TORNEO, SI EXISTE LA ACTUALIZAMOS
        if(seriesData.serieData.uid === undefined){

            let result = await serieService.createSerie(dataToSend);

            if(result.code === 200){
                let resultUpdate = {}
                switch(phaseFormatType) {
                    case "LEAGUE_PHASE":
                        resultUpdate = await tournamentService.addLeagueSerieToTournament(tournamentId, phase, seriesData.roundNumber, seriesData.serieNumber, result.data.id )
                        break;
                    case "BRACKET_PHASE":
                        resultUpdate = await tournamentService.addBracketSerieToTournament(tournamentId, phase, seriesData.roundNumber, seriesData.serieNumber, result.data.id )
                        break;
                    default:
                        break;
                }
                if(resultUpdate.code === 200) {
                    showAlert(resultUpdate.msg, "success");
                }else {
                    showAlert(result.msg, "error");
                }

            }else {
                showAlert(result.msg, "error");
            }
            updateData();
            functionClose();
        }else {

            let result = await serieService.updateSerie(seriesData.serieData.uid , {serie: dataToSend});

            if(result.code === 200){
                showAlert(result.msg, "success");
            }else {
                showAlert(result.msg, "error");
            }
            updateData();
            functionClose();
        }
    }

    const setMatchData = (value, index) => {
        let newMatches = [...matches]
        newMatches[index].matchData = {
            identifier: value
        }
        setMatches(newMatches);
    }

    const getParticipantsToBeWinners = () => {
        let listOfParticipantsToBeWinners = [
            {
                name: "-- Sin ganador --"
            }
        ]

        participantsToSelect.forEach((participant) => {
            if((homeParticipantSelected && homeParticipantSelected.id === participant.id) || (awayParticipantSelected && awayParticipantSelected.id === participant.id)){
                listOfParticipantsToBeWinners.push(participant);
            }
        })

        return listOfParticipantsToBeWinners;
    }

    return (
        <>
            <div className="modal-background">
                <div>
                    <form>
                    <div className="card modal-series-modifier">
                        <div className="card-header">
                            Modificar Serie
                        </div>
                        <div className="card-content">
                            <div className="flex vertical spacing-large">
                                <div className="flex spacing-large">
                                    {seriesData ? <>
                                            <div className="size-4-5">
                                                <Combobox id={"participant-1"}
                                                          itemsList={getParticipantsNotSelected(serie.roundNumber,"home").map((participant) => participant.name)}
                                                          label={"Participante 1"} placeholder={"Participante 1"}
                                                          selection={homeParticipantSelected ? homeParticipantSelected.name : "-- Sin participante --"}
                                                          onChange={(e) => onChangeParticipantCombobox(e, null)}/>
                                            </div>
                                            <div className="size-1-5">
                                                <InputNumber id={"result-participant-1"}
                                                             min={0}
                                                             max={getMaxScoreHomeParticipant()}
                                                             label={"Result"}
                                                             defaultValue = {seriesData.serieData.result.home_result}
                                                             placeholder={0}
                                                             disabled={homeParticipantSelected === undefined || ["CLOSED", "INSCRIPTIONS_OPEN", "INSCRIPTIONS_CLOSED", "FINISHED"].includes(tournamentStatus)}
                                                             onChange={(e) => {setScoreHome(Number(e.target.value))}}/>
                                            </div>
                                        </>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className="flex spacing-large">
                                    {
                                        seriesData ? <>
                                                <div className="size-4-5">
                                                    <Combobox id={"participant-2"}
                                                              itemsList={getParticipantsNotSelected(serie.roundNumber, "away").map((participant) => participant.name)}
                                                              label={"Participante 2"}
                                                              placeholder={"Participante 2"}
                                                              selection={awayParticipantSelected ? awayParticipantSelected.name : "-- Sin participante --"}
                                                              onChange={(e) => onChangeParticipantCombobox(null, e)} />
                                                </div>
                                                <div className="size-1-5">
                                                    <InputNumber id={"result-participant-2"}
                                                                 min={0}
                                                                 max={ getMaxScoreAwayParticipant() }
                                                                 defaultValue = {seriesData.serieData.result.away_result}
                                                                 label={"Result"}
                                                                 disabled={awayParticipantSelected === undefined || ["CLOSED", "INSCRIPTIONS_OPEN", "INSCRIPTIONS_CLOSED", "FINISHED"].includes(tournamentStatus)}
                                                                 placeholder={0}
                                                                 onChange={(e)=>{setScoreAway(Number(e.target.value))}}/>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                                {
                                    tournamentStatus && tournamentStatus === "ON_COURSE" ?
                                        <>
                                            <div className="flex align-spread spacing-large">
                                                <div>
                                                    Status
                                                </div>
                                                <div className="flex align-middle size-all">
                                                    <HorizontalSpliter color="white" />
                                                </div>
                                            </div>
                                            <div className="flex spacing-large">
                                                <div className="size-2-5">
                                                    <Combobox id={"status"}
                                                              itemsList={statusList.map(status => status.name)}
                                                              label={"Estado"} placeholder={"Status"}
                                                              selection={status ? status : null}
                                                              onChange={(e) => setStatus(e)} />
                                                </div>
                                                {
                                                    status !== undefined && (homeParticipantSelected !== undefined || awayParticipantSelected  !== undefined) && status === "Finalizado" ?
                                                        <div className="size-3-5">
                                                            <Combobox id={"winner"}
                                                                      itemsList={getParticipantsToBeWinners().map((participant) => participant.name)}
                                                                      label={"Ganador"}
                                                                      placeholder={"Ganador"}
                                                                      selection={selectedWinner ? selectedWinner.name : "-- Sin ganador --"}
                                                                      onChange={(e) => onChangeWinnerCombobox(e)} />
                                                        </div>
                                                        :
                                                        <></>
                                                }

                                            </div>
                                            <div className="flex align-spread spacing-large">
                                                <div>
                                                    Matches
                                                </div>
                                                <div className="flex align-middle size-all">
                                                    <HorizontalSpliter color="white"/>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <></>
                                }
                                {
                                    matches && tournamentStatus && tournamentStatus === "ON_COURSE" ? matches.map((match, index) => {
                                            return <div key={"match" + index} className="flex spacing-large">
                                                    <div className="size-3-4">
                                                        <InputText id={"match-" + index +"-id"}
                                                                   label={"Match ID"}
                                                                   defaultValue={match.matchData.identifier}
                                                                   placeholder={"Match ID"}
                                                                   onChange={(e) => setMatchData(e.target.value, index)}/>
                                                    </div>
                                                    <div className="flex size-1-4 align-bottom delete ">
                                                        <button type="button" onClick={()=>setMatches(matches.filter(m => m.matchData.uid !== match.matchData.uid))}>
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                        })
                                        :
                                        <></>
                                }
                                {
                                    getButtonAddMatches() && tournamentStatus && tournamentStatus === "ON_COURSE" ?
                                        <div className="flex align-start gap-large">
                                            <div className="size-1-5">
                                                <button type="button" onClick={()=>addMatch()}>
                                                    Add Match
                                                </button>
                                            </div>
                                        </div> : <></>
                                }
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="flex align-end gap-large p-0">
                                <div className="size-1-5">
                                    <button onClick={(e)=>{acceptChanges(e)}}>
                                        Accept
                                    </button>
                                </div>
                                <div className="size-1-5 delete">
                                    <button onClick={()=>functionClose(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default SeriesEdit;