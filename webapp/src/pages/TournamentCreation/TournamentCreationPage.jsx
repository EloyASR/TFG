import "./TournamentCreationPage.css";
import Step1Form from "./Step1Form.jsx";
import Step2Form from "./Step2Form.jsx";
import Step3Form from "./Step3Form.jsx";
import Step4Form from "./Step4Form.jsx";
import { useState } from "react";
import StepBar from "./StepBar";
import tournamentService from "../../services/tournamentService";

function TournamentCreationPage() {

    const [step, setStep] = useState(1);

    const [baseInfo, setBaseInfo] = useState(
        {
            name: "",
            game: "",
            size: undefined,
            playersType: "Jugadores"
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
            groupsData: undefined,
            bracketData: undefined
        }
    ]);


    const [register, setRegister] = useState(
        {
            value: false,
            startDateAndTime: {
                date: undefined,
                time: undefined
            },
            endDateAndTime: {
                date: undefined,
                time: undefined
            }
        }
    );

    const addPhase = () => {
        var copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases.push(
            {
                phaseOrder: copiaFases.length + 1,
                formatType: "",
                phaseName: "",
                leagueData: undefined,
                groupsData: undefined,
                bracketData: undefined
            }
        );
        setPhases(copiaFases);
    }

    const deletePhase = (index) => {
        var copiaFases = [];

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
                        if (baseInfo.size !== 2 && baseInfo.size !== 4 && baseInfo.size !== 8) {
                            item.formatType = "";
                            item.groupsData = undefined;
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
                            item.groupsData = undefined;
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
                    case "GROUPS_PHASE":
                        if (baseInfo.size !== 6 && baseInfo.size !== 8 && baseInfo.size !== 10 && baseInfo.size !== 12) {
                            item.formatType = "";
                            item.groupsData = undefined;
                            item.leagueData = undefined;
                            item.bracketData = undefined;
                        } else {
                            item.groupsData = {
                                size: baseInfo.size,
                                numberOfGroups: undefined,
                                naming: item.groupsData.naming,
                                matching: "Single Robin"
                            }
                        }
                        break;
                    default:
                        item.formatType = "";
                        item.groupsData = undefined;
                        item.leagueData = undefined;
                        item.bracketData = undefined;
                }
            }
        })

        setPhases(copiaFases);
    }


    const setPhaseName = (name, index) => {
        var copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases[index].phaseName = name;

        setPhases(copiaFases);
    }

    const setPhaseType = (type, index) => {

        var copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        switch (type) {
            case "League":
                copiaFases[index].formatType = "LEAGUE_PHASE";
                copiaFases[index].leagueData = {
                    size: undefined,
                    winPoints: 3,
                    tiePoints: 1,
                    losePoints: 0
                };
                copiaFases[index].groupsData = undefined;
                copiaFases[index].bracketData = undefined;
                break;
            case "Groups":
                copiaFases[index].formatType = "GROUPS_PHASE";
                copiaFases[index].leagueData = undefined;
                copiaFases[index].groupsData = {
                    size: baseInfo.size,
                    numberOfGroups: undefined,
                    naming: undefined,
                    matching: "Single Robin"
                };
                copiaFases[index].bracketData = undefined;
                break;
            case "Bracket":
                copiaFases[index].formatType = "BRACKET_PHASE";
                copiaFases[index].leagueData = undefined;
                copiaFases[index].groupsData = undefined;
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

        console.log(data);

        var copiaFases = [];

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
        console.log("Pasamos al paso 2");
    }

    const handleStep2Continue = function () {
        setStep(3)
    }

    const handleStep2Back = function () {
        setStep(1);
    }

    const handleStep3Continue = function () {
        setStep(4);
        console.log("Pasamos al paso 4");
    }

    const handleStep3Back = function () {
        setStep(2);
        console.log("Volvemos al paso 2");
    }

    const handleStep4Continue = function () {
        setStep(4);

        //Añadimos los datos básicos
        var dataToSend = {
            name: baseInfo.name,
            game: baseInfo.game,
            size: baseInfo.size,
            participants: undefined,
            description: descAndRules.description,
            rules: descAndRules.rules,
            playersType: baseInfo.playersType,
            phases: phases,
            online: true,
            location: undefined,
            inscription: false,
            inscriptionDateInit: undefined,
            inscriptionDateEnd: undefined,
        }

        //Añadimos los datos del registro
        dataToSend.inscription = register.value;
        if (register.startDateAndTime.date && register.startDateAndTime.time) {
            dataToSend.inscriptionDateInit = new Date(
                register.startDateAndTime.date.split("-")[0],
                parseInt(register.startDateAndTime.date.split("-")[1]) - 1,
                register.startDateAndTime.date.split("-")[2],
                register.startDateAndTime.time.split(":")[0],
                register.startDateAndTime.time.split(":")[1]
            )
        }
        if (register.endDateAndTime.date && register.endDateAndTime.time) {
            dataToSend.inscriptionDateEnd = new Date(
                register.endDateAndTime.date.split("-")[0],
                parseInt(register.endDateAndTime.date.split("-")[1]) - 1,
                register.endDateAndTime.date.split("-")[2],
                register.endDateAndTime.time.split(":")[0],
                register.endDateAndTime.time.split(":")[1]
            )
        }

        tournamentService.createTournament(dataToSend);

        console.log("Creamos el torneo");
    }

    const handleStep4Back = function () {
        setStep(3);
        console.log("Volvemos al paso 3");
    }

    console.log(baseInfo);
    console.log(phases);
    console.log(register);

    return (
        <>
            <div className="main">
                <div className="tournament-creation-page">
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
                            <Step4Form actionBack={() => handleStep4Back()} actionContinue={() => handleStep4Continue()} register={register} setRegister={(registro) => setRegister(registro)} />
                            : <></>
                    }

                </div>
            </div>
        </>
    );
}

export default TournamentCreationPage;