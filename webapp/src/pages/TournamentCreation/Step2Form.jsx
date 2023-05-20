import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import HorizontalSpliter from '../components/HorizontalSpliter';
import PhaseConfiguration from './PhaseConfiguration';
import { Fragment } from 'react';
import InputTextarea from '../components/InputTextarea';

function Step3Form({ actionBack, actionContinue, phases, addPhase, deletePhase, setPhaseType, setPhaseData }) {

    return (<>
        <div className="creacion-datos-basicos-container">
            <form className="creacion-datos-basicos-form" onSubmit={(e) => {
                e.preventDefault();
                actionContinue();
            }}>
                <div className="card">
                    <div className="card-header">
                        Descripción y reglas
                    </div>
                    <div className="card-content">
                        <div className="flex vertical spacing-medium">
                            <div className="size-content">

                                <InputTextarea label={"Descripción"}/>
                            </div>
                            <div className="size-content">

                                <InputTextarea label={"Reglas"}/>
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
                            <div className="size-content next">
                                <button type="submit">
                                    Continue
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
    );
}

export default Step3Form;