import {images} from "../../../../helpers/images";
import {Link} from "react-router-dom"

function Participant({ participant }) {
    return (
        <>
            <div className="size-1-4">
                <Link to={"/user/" + participant.id}>
                    <div className="participant">
                        <div className="icon">
                            <img src={participant.icon?images("./profile_icons/" + participant.icon): images("./profile_icons/icon_default.jpg")} alt={"Icono Participante " + participant.name}/>
                        </div>
                        <div className="name">{participant.name}</div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Participant;