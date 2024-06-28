import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import InputTextarea from '../../components/InputTextarea';

function Step3Form({ actionBack, actionContinue, descriptionAndRules, setDescAndRules }) {

    const setDescription = (description) => {

        let copiaDescriptionAndRules = {
            description: description,
            rules: descriptionAndRules.rules
        }

        setDescAndRules(copiaDescriptionAndRules);
    }

    const setRules = (rules) => {
        let copiaDescriptionAndRules = {
            description: descriptionAndRules.description,
            rules: rules
        }

        setDescAndRules(copiaDescriptionAndRules);
    }

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
                        <div className="flex vertical gap-large">
                            <div className="size-content">
                                <InputTextarea label={"Descripción"} id={"description"} name={"description"} placeholder={"Descripción del torneo"} onChange={(e) => setDescription(e.target.value)} defaultValue={descriptionAndRules.description}/>
                            </div>
                            <div className="size-content">
                                <InputTextarea label={"Reglas"} id={"rules"} name={"rules"} placeholder={"Reglas del torneo"} onChange={(e) => setRules(e.target.value)} defaultValue={descriptionAndRules.rules}/>
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