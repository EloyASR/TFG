import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import InputRadio from '../../components/InputRadio';
import InputDate from '../../components/InputDate';
import {getDateTomorrow,getDatePlusOneDay} from '../../../helpers/dates';

function Step4Form({ actionBack, actionContinue, setRegister, register, setStartAndEnd, startAndEnd}) {

    const changeStartAndEnd = (start, end) => {

        let copiaStartAndEnd = {...startAndEnd};

        if(start){
            if(start > copiaStartAndEnd.endDateAndTime){
                copiaStartAndEnd.startDateAndTime = copiaStartAndEnd.endDateAndTime;
            }else {
                copiaStartAndEnd.startDateAndTime = start;
            }
        }

        if(end) {
            if(end < copiaStartAndEnd.startDateAndTime) {
                copiaStartAndEnd.endDateAndTime = copiaStartAndEnd.startDateAndTime;
            }else {
                copiaStartAndEnd.endDateAndTime = end;
            }
        }

        setStartAndEnd(copiaStartAndEnd);
    }

    const changeInscription = (active, start, end) => {

        let copiaRegistro = {...register};

        if(active) {
            if(active === "Si") {
                copiaRegistro.value = true;
                copiaRegistro.startInscriptionDateAndTime = getDateTomorrow();
                copiaRegistro.endInscriptionDateAndTime =  getDatePlusOneDay(getDateTomorrow());
            }else{
                copiaRegistro.value = false;
                copiaRegistro.startInscriptionDateAndTime = getDateTomorrow();
                copiaRegistro.endInscriptionDateAndTime = getDatePlusOneDay(getDateTomorrow());
            }
        }

        if(start){
            if(start > copiaRegistro.endInscriptionDateAndTime) {
                copiaRegistro.startInscriptionDateAndTime = copiaRegistro.endInscriptionDateAndTime;
            }else {
                copiaRegistro.startInscriptionDateAndTime = start;
            }
        }

        if(end) {
            if(end < copiaRegistro.startInscriptionDateAndTime) {
                copiaRegistro.endInscriptionDateAndTime = copiaRegistro.startInscriptionDateAndTime;
            }else if (end > startAndEnd.startDateAndTime) {
                copiaRegistro.endInscriptionDateAndTime = startAndEnd.startDateAndTime;
            }else {
                copiaRegistro.endInscriptionDateAndTime = end;
            }
        }
        setRegister(copiaRegistro);
    }

    return (<>
            <div className="creacion-datos-basicos-container">
                <form className="creacion-datos-basicos-form">
                    <div className="card">
                        <div className="card-header">
                            Fechas
                        </div>
                        <div className="card-content">
                            <div className="flex vertical gap-large size-content">
                                <div className="flex vertical spacing-medium">
                                    <div className="size-content">
                                        <InputDate label={"Inicio del torneo"} onChange={(startDate)=>changeStartAndEnd(startDate,null)} dateAndTime={startAndEnd.startDateAndTime} min={register.value ? register.endInscriptionDateAndTime : getDateTomorrow()} max={startAndEnd.endDateAndTime}/>
                                    </div>
                                    <div className="size-content">
                                        <InputDate label={"Fin del torneo"} onChange={(endDate)=>changeStartAndEnd(null,endDate)} dateAndTime={startAndEnd.endDateAndTime} min={startAndEnd.startDateAndTime}/>
                                    </div>
                                </div>
                                <div className="flex vertical spacing-medium">
                                    <div className="size-content">
                                        <InputRadio label={"¿Activar registro?"} id={"registro"} name={"registro"} itemsList={["Si", "No"]} checked={register.value?"Si":"No"} defaultChecked={register.value?"Si":"No"} onChange={(value)=>changeInscription(value,null,null)}/>
                                    </div>
                                    <div className="size-content">
                                        <InputDate label={"Inicio del registro"} onChange={(startDate)=>{changeInscription(null, startDate, null)}} dateAndTime={register.startInscriptionDateAndTime} min={getDateTomorrow()} max={register.endInscriptionDateAndTime} disabled={!register.value}/>
                                    </div>
                                    <div className="size-content">
                                        <InputDate label={"Fin del registro"} onChange={(endDate)=> {changeInscription(null, null, endDate)}} dateAndTime={register.endInscriptionDateAndTime} min={register.startInscriptionDateAndTime} max={startAndEnd.startDateAndTime} disabled={!register.value}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="flex align-spread">
                                <div className="size-content back delete">
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        actionBack();
                                    }}>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        Back
                                    </button>
                                </div>
                                <div className="size-content add accept">
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