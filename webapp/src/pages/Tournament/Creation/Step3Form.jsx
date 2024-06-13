import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import HorizontalSpliter from '../../components/HorizontalSpliter';
import PhaseConfiguration from './PhaseConfiguration';
import { Fragment, useEffect } from 'react';

function Step3Form({ actionBack, actionContinue, phases, addPhase, deletePhase, setPhaseName, setPhaseType, setPhaseData, size }) {


    useEffect(()=>{
        if(phases.length === 2){
            if(phases[0].formatType === "BRACKET_PHASE"){
                deletePhase(1);
            }
        }
    })

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
                        <div className="flex vertical gap-large">
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
                                        <PhaseConfiguration index={index} phase={item} phases={phases} size={size} deletePhase={() => deletePhase(index)} setPhaseName={(name) => setPhaseName(name, index)} setPhaseType={(type) => setPhaseType(type, index)} setPhaseData={(data) => setPhaseData(data, index)} />
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
                            {
                                phases[phases.length - 1].formatType !== "BRACKET_PHASE" && phases.length < 2? <div className="size-content">
                                    <div className="flex align-end">
                                        <div className="size-content add accept">
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
                                    :
                                    <></>
                            }
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
                                    Atrás
                                </button>
                            </div>
                            <div className="size-content next accept">
                                <button type="submit">
                                    Continuar
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