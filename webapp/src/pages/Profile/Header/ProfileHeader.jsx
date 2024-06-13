import "./ProfileHeader.css"
import { images } from "../../../helpers/images";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";



function ProfileHeader({profileInfo}){

    const navigate = useNavigate();

    const editProfile = ()=>{
        navigate('/profile/edit');
    }

    return <>
        <div className="header">
            Profile
        </div>
        <div className="body">
            <div className="info">
                <div className="icon">
                    <img src={profileInfo.icon?images("./profile_icons/" + profileInfo.icon): images("./profile_icons/icon_default.jpg")} alt="" />
                </div>
                <div className="data">
                    <div className="nickname">{profileInfo.name}</div>
                    <div className="lvl"></div>
                    <div className="accept add">
                        <button className="button" onClick={editProfile}>
                            <FontAwesomeIcon icon={faEdit}/>
                            Editar perfil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default ProfileHeader