import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";

function EditStatusModal({newStatus, onConfirm, onCancel}) {

    const MessageOfAdvise = () => {
        switch(newStatus){
            case "INSCRIPTIONS_OPEN":
                return <>
                    <p className={"mt-4"}>Está a punto de cambiar el estado a Inscripciones Abiertas</p>
                    <p>Una vez cambiado no podrá volver a estado cerrado</p>
                    <p>Nuevas funcionalidades desbloqueadas: </p>
                    <p>- Registro por parte de los jugadores en el torneo</p>
                </>
            case "INSCRIPTIONS_CLOSED":
                return <>
                    <p className={"mt-4"}>Está a punto de cambiar el estado a Inscripciones Cerradas</p>
                    <p>Una vez cambiado no podrá volver a estado Inscripciones Abiertas</p>
                    <p>Nuevas funcionalidades desbloqueadas: </p>
                    <p>- Modificación de los partidos del torneo</p>
                    <p>Funcionalidades eliminadas:</p>
                    <p>- Registro por parte de los jugadores en el torneo</p>
                </>
            case "ON_COURSE":
                return <>
                    <p className={"mt-4"}>Está a punto de cambiar el estado a En Curso</p>
                    <p>Una vez cambiado no podrá volver a estado Inscripciones Cerradas</p>
                    <p>Nuevas funcionalidades desbloqueadas: </p>
                    <p>- Modificación de los resultados de los partidos</p>
                    <p>- Cierre de fases</p>
                </>
            case "FINISHED":
                return <>
                    <p className={"mt-4"}>Está a punto de cambiar el estado a Finalizado</p>
                    <p>Una vez cambiado no podrá volver a estado En Curso</p>
                    <p>No podrá realizar ninguna acción</p>
                </>
            default:
                return <></>
        }
    }

    return <div className="modal-background">
        <div className="card modal-sponsor-details">
            <div className="card-header">
                Cierre de fase
            </div>
            <div className="card-content">
                <div className={"flex vertical align-middle"}>
                    <FontAwesomeIcon icon={faCircleInfo} size={"2xl"}/>
                    <MessageOfAdvise/>
                </div>
            </div>
            <div className="card-footer">
                <div className={"flex spacing-medium size-1-1"}>
                    <div className={"size-1-2 accept"}>
                        <button onClick={() => {onConfirm()}}>
                            Aceptar
                        </button>
                    </div>
                    <div className={"size-1-2 delete"}>
                        <button onClick={() => {onCancel()}}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EditStatusModal;