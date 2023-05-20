import LoLProfile from "./GameProfile/LoLProfile/LoLProfile";
import ProfileHeader from "./Header/ProfileHeader";
import ProfileNav from "./Nav/ProfileNav";
import "./Profile.css";

function Profile(props) {
    
    var profileInfo = JSON.parse(localStorage.getItem("user"));

    return <>
        <div className="main">
            <div className="profile">
                <div className="header">
                    <ProfileHeader profileInfo={profileInfo} />
                </div>
                <div className="nav">
                    <ProfileNav />
                </div>
                <div className="body">
                    <LoLProfile />
                </div>
            </div>
        </div>
    </>
}

export default Profile