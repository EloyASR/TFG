import "./ProfileHeader.css"
import defaultIcon from '../../../assets/multimedia/icon_01.png';

function ProfileHeader(props){
    return <>
        <div className="header">
            Profile
        </div>
        <div className="body">
            <div className="info">
                <div className="icon">
                    <img src={defaultIcon} alt="" />
                </div>
                <div className="data">
                    <div className="nickname">Nickname</div>
                    <div className="lvl"></div>
                </div>
            </div>
        </div>
    </>;
}

export default ProfileHeader