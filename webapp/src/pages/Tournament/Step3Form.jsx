import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import InputRadio from '../components/InputRadio';
import InputDate from '../components/InputDate';

function Step3Form({ actionBack, actionContinue }) {

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
                                <InputRadio label={"¿Activar registro?"} itemsList={["Si", "No"]} checked={"No"} defaultChecked={"No"} />
                            </div>
                            <div className="size-content">
                                <InputDate label={"Fecha y hora de inicio del registro"} />
                            </div>
                            <div className="size-content">
                                <InputDate label={"Fecha y hora de fin del registro"} />
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

export default Step3Form;