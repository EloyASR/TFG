import "./TournamentCreationPage.css";
import Step1Form from "./Step1Form.jsx";
import Step2Form from "./Step2Form.jsx";
import Step3Form from "./Step3Form.jsx";
import Step4Form from "./Step4Form.jsx";
import { useState } from "react";
import StepBar from "./StepBar";
import tournamentService from "../../../services/tournamentService";
import {getDatePlusOneDay, getDateTomorrow} from "../../../helpers/dates";
import {useAlert} from "../../../context/AlertContext";
import {useNavigate} from "react-router";

function TournamentCreationPage() {

    const { showAlert } = useAlert();

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [baseInfo, setBaseInfo] = useState(
        {
            name: "",
            game: "",
            size: undefined,
            playersType: "SINGLE",
            prize: "",
            havePrize: false,
        }
    );

    const [descAndRules, setDescAndRules] = useState(
        {
            description: "",
            rules: ""
        }
    )

    const [phases, setPhases] = useState([
        {
            phaseOrder: 1,
            formatType: "",
            phaseName: "",
            leagueData: undefined,
            bracketData: undefined
        }
    ]);


    const [register, setRegister] = useState(
        {
            value: false,
            startInscriptionDateAndTime: getDateTomorrow(),
            endInscriptionDateAndTime: getDatePlusOneDay(getDateTomorrow()),
        }
    );

    const [startAndEnd, setStartAndEnd] = useState(
        {
            startDateAndTime: getDateTomorrow(),
            endDateAndTime: getDatePlusOneDay(getDateTomorrow()),
        }
    )

    const addPhase = () => {
        let copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases.push(
            {
                phaseOrder: copiaFases.length + 1,
                formatType: "",
                phaseName: "",
                leagueData: undefined,
                bracketData: undefined
            }
        );
        setPhases(copiaFases);
    }

    const deletePhase = (index) => {
        let copiaFases = [];

        phases.forEach((item, indice) => {
            if (indice !== index) {
                copiaFases.push(item);
            }
        });

        copiaFases.forEach((item, indice) => {
            item.phaseOrder = indice + 1;
            if (indice === 0) {
                switch (item.formatType) {
                    case "BRACKET_PHASE":
                        if (baseInfo.size !== 2 && baseInfo.size !== 4 && baseInfo.size !== 8 && baseInfo.size !== 16) {
                            item.formatType = "";
                            item.leagueData = undefined;
                            item.bracketData = undefined;
                        } else {
                            item.bracketData = {
                                size: baseInfo.size,
                                tieBreaker: item.bracketData.tieBreaker,
                                bestOf: item.bracketData.bestOf,
                                rounds: []
                            }
                        }
                        break;
                    case "LEAGUE_PHASE":
                        if (baseInfo.size < 3) {
                            item.formatType = "";
                            item.leagueData = undefined;
                            item.bracketData = undefined;
                        } else {
                            item.leagueData = {
                                size: baseInfo.size,
                                winPoints: item.leagueData.winPoints,
                                tiePoints: item.leagueData.tiePoints,
                                losePoints: item.leagueData.losePoints
                            }
                        }
                        break;
                    default:
                        item.formatType = "";
                        item.leagueData = undefined;
                        item.bracketData = undefined;
                }
            }
        })

        setPhases(copiaFases);
    }


    const setPhaseName = (name, index) => {
        let copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases[index].phaseName = name;

        setPhases(copiaFases);
    }

    const setPhaseType = (type, index) => {

        let copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        switch (type) {
            case "League":
                copiaFases[index].formatType = "LEAGUE_PHASE";
                copiaFases[index].bracketData = undefined;
                copiaFases[index].leagueData = {
                    size: undefined,
                    winPoints: 3,
                    tiePoints: 1,
                    losePoints: 0,
                    bestOf: undefined,
                    twoLegged: false
                };

                break;
            case "Bracket":
                copiaFases[index].formatType = "BRACKET_PHASE";
                copiaFases[index].leagueData = undefined;
                copiaFases[index].bracketData = {
                    size: undefined,
                    tieBreaker: false,
                    bestOf: undefined,
                    rounds: []
                };
                break;
            default:
                copiaFases[index].formatType = "";
                copiaFases[index].leagueData = undefined;
                copiaFases[index].groupsData = undefined;
                copiaFases[index].bracketData = undefined;
        }

        setPhases(copiaFases);
    }

    const setPhaseData = (data, index) => {

        let copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        switch (copiaFases[index].formatType) {
            case "LEAGUE_PHASE":
                copiaFases[index].leagueData = data;
                break;
            case "GROUPS_PHASE":
                copiaFases[index].groupsData = data;
                break;
            case "BRACKET_PHASE":
                copiaFases[index].bracketData = data;
                break;
            default:
                copiaFases[index].formatType = "";
                copiaFases[index].leagueData = undefined;
                copiaFases[index].groupsData = undefined;
                copiaFases[index].bracketData = undefined;
        }

        setPhases(copiaFases);
    }

    const handleStep1Continue = function () {
        setStep(2);
    }

    const handleStep2Continue = function () {
        setStep(3)
    }

    const handleStep2Back = function () {
        setStep(1);
    }

    const handleStep3Continue = function () {
        setStep(4);
    }

    const handleStep3Back = function () {
        setStep(2);
    }

    const handleStep4Continue = async () => {
        setStep(4);

        //Añadimos los datos básicos
        let dataToSend = {
            name: baseInfo.name,
            game: baseInfo.game.uid,
            mode: baseInfo.game.modes[0]._name,
            size: baseInfo.size,
            participants: [],
            description: descAndRules.description,
            rules: descAndRules.rules,
            participantsType: "SINGLE",
            phases: phases,
            online: true,
            location: undefined,
            inscription: false,
            inscriptionInitDate: undefined,
            inscriptionEndDate: undefined,
            initDate: undefined,
            endDate: undefined,
            status: "CLOSED",
            currentPhase: 0,
            creator: JSON.parse(localStorage.getItem("user")).uid,
            sponsoredBy:[]
        }

        if(baseInfo.havePrize){
            dataToSend.prize = baseInfo.prize;
        }else{
            dataToSend.prize = "";
        }

        dataToSend.initDate = startAndEnd.startDateAndTime;
        dataToSend.endDate = startAndEnd.endDateAndTime;
        dataToSend.inscription = register.value;
        if(register.value) {
            dataToSend.inscriptionInitDate = register.startInscriptionDateAndTime;
            dataToSend.inscriptionEndDate = register.endInscriptionDateAndTime;
        }else {
            dataToSend.inscriptionInitDate = undefined;
            dataToSend.inscriptionEndDate = undefined;
        }

        let result = await tournamentService.createTournament(dataToSend);

        if(result.code === 400) {
            showAlert(result.msg, "error");
        }else if(result.code === 200){
            showAlert(result.msg, "success");
        }

        navigate("/my-tournaments");

    }

    const handleStep4Back = function () {
        setStep(3);
    }

    return (
        <>
            <div className="main">
                <div className="flex vertical align-start tournament-creation-page">
                    <StepBar step={step} />
                    {
                        step === 1 ?
                            <Step1Form
                                actionContinue={() => handleStep1Continue()}
                                baseInfo={baseInfo}
                                setBaseInfo={(baseInfo) => setBaseInfo(baseInfo)}
                                resetPhases={() => setPhases([{
                                    phaseOrder: 1,
                                    formatType: "",
                                    phaseName: "",
                                    leagueData: undefined,
                                    groupsData: undefined,
                                    bracketData: undefined
                                }])} />
                            : <></>
                    }
                    {
                        step === 2 ?
                            <Step2Form
                                actionBack={() => handleStep2Back()}
                                descriptionAndRules={descAndRules}
                                setDescAndRules={(descAndRules) => setDescAndRules(descAndRules)}
                                actionContinue={() => handleStep2Continue()}
                            />
                            : <></>
                    }
                    {
                        step === 3 ?
                            <Step3Form
                                actionBack={() => handleStep3Back()}
                                actionContinue={() => handleStep3Continue()}
                                size={baseInfo.size}
                                phases={phases}
                                addPhase={() => addPhase()}
                                deletePhase={(index) => deletePhase(index)}
                                setPhaseName={(name, index) => setPhaseName(name, index)}
                                setPhaseType={(type, index) => setPhaseType(type, index)}
                                setPhaseData={(data, index) => setPhaseData(data, index)}
                            />
                            : <></>
                    }
                    {
                        step === 4 ?
                            <Step4Form actionBack={() => handleStep4Back()} actionContinue={() => handleStep4Continue()} register={register} setRegister={(registro) => setRegister(registro)} startAndEnd={startAndEnd} setStartAndEnd={(startAndEnd) => setStartAndEnd(startAndEnd)} />
                            : <></>
                    }

                </div>
            </div>
        </>
    );
}

export default TournamentCreationPage;