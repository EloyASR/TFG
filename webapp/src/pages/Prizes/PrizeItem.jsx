import {faEdit, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router";
import {images} from "../../helpers/images";

function PrizeItem({prize, onDelete}){

    const navigate = useNavigate();

    const editPrize = async () => {
        navigate('/prize/edit/' + prize.uid);
    }

    return <>
        <div className = "prize-item">
            <div className="prize-img">
                {
                    prize.image !== "" ?
                        <img src={prize.image} alt="" />
                        :
                        <img src={images("./default_prize.png")} alt="Imagen por defecto premio"/>
                }
            </div>
            <div className="prize-info">
                <div className="prize-name">
                    {prize.name}
                </div>
                <div className="prize-desc">
                    {prize.description}
                </div>
            </div>
            <div className="prize-buttons flex align-middle spacing-medium no-wrap">
                <div className={"accept"}>
                    <button onClick={editPrize}>
                        <FontAwesomeIcon icon={faEdit}/>
                        Editar
                    </button>
                </div>
                <div className="delete">
                    <button onClick={()=> {onDelete(prize.uid)}}>
                        <FontAwesomeIcon icon={faTrashCan} />
                        Eliminar
                    </button>
                </div>

            </div>
        </div>
    </>
}

export default PrizeItem