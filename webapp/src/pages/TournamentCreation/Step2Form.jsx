import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import HorizontalSpliter from '../components/HorizontalSpliter';
import PhaseConfiguration from './PhaseConfiguration';
import { Fragment } from 'react';

function Step2Form({ actionBack, actionContinue, phases, addPhase, deletePhase, setPhaseType, setPhaseData}) {

    return (<>
        <div className="creacion-datos-basicos-container">
            <form className="creacion-datos-basicos-form" onSubmit={(e) => {
                e.preventDefault();
                actionContinue();
            }}>
                <div className="card">
                    <div className="card-header">
                        Configuración de fases
                    </div>
                    <div className="card-content">
                        <div className="flex vertical spacing-medium">
                            {
                                phases.map((item, index) =>
                                    <Fragment key={index}>
                                        {
                                            index === 0 ?
                                                <>
                                                    <div className="size-content">
                                                        <div className='flex'>
                                                            <div className="size-1-1">
                                                                <HorizontalSpliter />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <></>
                                        }
                                        <PhaseConfiguration index={index} phase={item} deletePhase={()=>deletePhase(index)} setPhaseType={(type)=>setPhaseType(type, index)} setPhaseData={(data)=>setPhaseData(data,index)}/>
                                        <div className="size-content">
                                            <div className='flex'>
                                                <div className="size-1-1">
                                                    <HorizontalSpliter />
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            }
                            <div className="size-content">
                                <div className="flex align-end">
                                    <div className="size-content add">
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            console.log("prueba")
                                            addPhase();
                                        }}>
                                            <FontAwesomeIcon icon={faPlus} />
                                            Añadir Fase
                                        </button>
                                    </div>
                                </div>
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

export default Step2Form;