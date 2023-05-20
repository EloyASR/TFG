import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import InputRadio from '../components/InputRadio';
import InputDate from '../components/InputDate';
import { useEffect, useState } from 'react';

function Step4Form({ actionBack, actionContinue, setRegister, register}) {

    const [registro, setRegistro] = useState({});

    useEffect(()=>{
        setRegistro(register);
    },[register])


    const setRegistroValue = (value)=>{

        var copiaRegistro = {
            value: false,
            startDateAndTime: registro.startDateAndTime,
            endDateAndTime: registro.endDateAndTime
        }

        if(value === "Si"){
            copiaRegistro.value = true;
        }else{
            copiaRegistro.value = false;
        }

        setRegister(copiaRegistro);
    }

    const setStartDateAndTime = (startDateAndTime)=>{

        var copiaRegistro = {
            value: registro.value,
            startDateAndTime: startDateAndTime,
            endDateAndTime: registro.endDateAndTime
        }

        setRegister(copiaRegistro);

    }


    const setEndDateAndTime = (endDateAndTime)=>{

        var copiaRegistro = {
            value: registro.value,
            startDateAndTime: registro.startDateAndTime,
            endDateAndTime: endDateAndTime
        }

        setRegister(copiaRegistro);
    }

    console.log(registro);

    return (<>
        <div className="creacion-datos-basicos-container">
            <form className="creacion-datos-basicos-form">
                <div className="card">
                    <div className="card-header">
                        Configuración de registro
                    </div>
                    <div className="card-content">
                        <div className="flex vertical spacing-medium">
                            <div className="size-content">
                                <InputRadio label={"¿Activar registro?"} id={"registro"} name={"registro"} itemsList={["Si", "No"]} checked={registro.value?"Si":"No"} defaultChecked={registro.value?"Si":"No"} onChange={(value)=>setRegistroValue(value)}/>
                            </div>
                            <div className="size-content">
                                <InputDate label={"Fecha y hora de inicio del registro"} onChange={(startDate)=>setStartDateAndTime(startDate)} dateAndTime={registro.startDateAndTime}/>
                            </div>
                            <div className="size-content">
                                <InputDate label={"Fecha y hora de fin del registro"} onChange={(endDate)=>setEndDateAndTime(endDate)} dateAndTime={registro.endDateAndTime}/>
                            </div>
                        </div>

                    </div>
                    <div className="card-footer">
                        <div className="flex align-spread">
                            <div className="size-content back">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    actionBack();
                                }}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    Back
                                </button>
                            </div>
                            <div className="size-content add">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    actionContinue();
                                }}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </form >
        </div >
    </>
    );
}

export default Step4Form;