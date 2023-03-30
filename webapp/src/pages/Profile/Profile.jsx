import LoLProfile from "./GameProfile/LoLProfile/LoLProfile";
import ProfileHeader from "./Header/ProfileHeader";
import ProfileNav from "./Nav/ProfileNav";
import "./Profile.css";

function Profile(props) {
    return <>
        <div className="profile">
            <div className="header">
                <ProfileHeader/>
            </div>
            <div className="nav">
                <ProfileNav/>
            </div>
            <div className="body">
                <LoLProfile />
            </div>
        </div>
    </>
}

export default Profile