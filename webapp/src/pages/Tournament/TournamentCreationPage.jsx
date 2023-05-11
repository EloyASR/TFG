import "./TournamentCreationPage.css";
import Step1Form from "./Step1Form.jsx";
import Step2Form from "./Step2Form.jsx";
import Step3Form from "./Step3Form.jsx";
import { useState } from "react";
import StepBar from "./StepBar";

function TournamentCreationPage() {

    const [step, setStep] = useState(1);
    const [phases, setPhases] = useState([
        {
            phaseOrder: 1,
            phaseName: "",
            phaseType: "",
            phaseData:{}
        }
    ]);

    const addPhase = () => {
        var copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases.push(
            {
                phaseOrder: copiaFases.length+1,
                phaseName: "",
                phaseType: "",
                phaseData:{}
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

        copiaFases.forEach((item, indice)=>{
            item.phaseOrder = indice+1;
        })

        setPhases(copiaFases);
    }

    const setPhaseType = (type, index) => {

        console.log(type);

        var copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases[index].phaseType = type;

        setPhases(copiaFases);
    }

    const setPhaseData = (data, index) => {

        console.log(data);

        var copiaFases = [];

        phases.forEach((item) => {
            copiaFases.push(item);
        })

        copiaFases[index].phaseData = data;

        setPhases(copiaFases);
    }


    const handleStep1 = function (name, game, size, type) {
        setStep(2);
        console.log("Pasamos al paso 2");
    }

    const handleStep2Continue = function () {
        setStep(3);
        console.log("Pasamos al paso 3");
    }

    const handleStep2Back = function () {
        setStep(1);
        console.log("Volvemos al paso 1");
    }

    const handleStep3Continue = function () {
        setStep(3);
        console.log("Creamos el torneo");
    }

    const handleStep3Back = function () {
        setStep(2);
        console.log("Volvemos al paso 2");
    }

    console.log(phases);

    return (
        <>
            <div className="tournament-creation-page">
                <StepBar step={step} />
                {
                    step === 1 ?
                        <Step1Form actionContinue={(name, game, size, type) => handleStep1(name, game, size, type)} />
                        : <></>
                }
                {
                    step === 2 ?
                        <Step2Form 
                            actionBack={() => handleStep2Back()} 
                            actionContinue={() => handleStep2Continue()}
                            phases={phases}
                            addPhase={()=>addPhase()}
                            deletePhase={(index)=>deletePhase(index)}
                            setPhaseType={(type,index)=>setPhaseType(type,index)}
                            setPhaseData={(data,index)=>setPhaseData(data,index)}
                        />
                        : <></>
                }
                {
                    step === 3 ?
                        <Step3Form actionBack={() => handleStep3Back()} actionContinue={() => handleStep3Continue()} />
                        : <></>
                }

            </div>
        </>
    );
}

export default TournamentCreationPage;