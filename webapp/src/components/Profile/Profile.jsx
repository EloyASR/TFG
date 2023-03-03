import LoLProfile from "./GameProfile/LoLProfile/LoLProfile";
import ProfileHeader from "./Header/ProfileHeader";
import "./Profile.css";

function Profile(props) {
    return <>
        <div className="profiles">
            <ProfileHeader/>
            <LoLProfile />
        </div>
    </>
}

export default Profile