import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";

function DeleteUserModal({onConfirm, onCancel}) {
    return <div className="modal-background">
        <div>
            <div className="card modal-sponsor-details">
                <div className="card-header">
                    Eliminación de cuenta
                </div>
                <div className="card-content">
                    <div className={"flex vertical align-middle"}>
                        <FontAwesomeIcon icon={faCircleInfo} size={"2xl"}/>
                        <p className={"mt-4"}>Si borra su cuenta todos sus datos se eliminaran permanentemente</p>
                        <p>¿Esta seguro de querer eliminar la cuenta?</p>
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
    </div>
}

export default DeleteUserModal;