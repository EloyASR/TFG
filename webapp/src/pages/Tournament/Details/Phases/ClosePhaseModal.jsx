import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import tournamentService from "../../../../services/tournamentService";

function  ClosePhaseModal({tournamentData, closeModal}) {

    const closePhase = async () => {
        await tournamentService.closeActualPhase(tournamentData.uid);
        closeModal();
    }

    return <div className="modal-background">
        <div className="card modal-sponsor-details">
            <div className="card-header">
                Cierre de fase
            </div>
            <div className="card-content">
                <div className={"flex vertical align-middle"}>
                    <FontAwesomeIcon icon={faCircleInfo} size={"2xl"}/>
                    <p className={"mt-4"}>Está a punto de cerrar esta fase</p>
                    <p>Si cierra esta fase no podrá volver a abrirla para editar los datos ¿Está seguro?</p>
                </div>
            </div>
            <div className="card-footer">
                <div className={"flex spacing-medium size-1-1"}>
                    <div className={"size-1-2 accept"}>
                        <button onClick={() => {closePhase()}}>
                            Sí
                        </button>
                    </div>
                    <div className={"size-1-2 delete"}>
                        <button onClick={() => {closeModal(false)}}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ClosePhaseModal;