import "./ProfileHeader.css"
import defaultIcon from '../../../assets/multimedia/icon_01.png';
import { images } from "../../../helpers/images";

function ProfileHeader({profileInfo}){
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
                </div>
            </div>
        </div>
    </>;
}

export default ProfileHeader