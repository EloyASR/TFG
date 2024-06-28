import LoLProfile from "./GameProfile/LoLProfile/LoLProfile";
import ProfileHeader from "./Header/ProfileHeader";
import ProfileNav from "./Nav/ProfileNav";
import "./Profile.css";
import {useEffect, useState} from "react";
import userService from "../../services/userService";
import gameService from "../../services/gameService";

function Profile({userId}) {

    const [profileInfo, setProfileInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [selectedAccount, setSelectedAccount] = useState(undefined);
    const [games, setGames] = useState([]);

    useEffect(() => {
        getProfileInfo();
        getGamesInfo();
    }, [selectedAccount]);

    const getProfileInfo = async () => {
        if(userId) {
            try {
                let response = await userService.getUser(userId)
                if(selectedAccount === undefined){
                    setSelectedAccount(response.accounts[0])
                }
                setProfileInfo(response);
            }catch(error){
            }
        }else{
            try {
                let response = await userService.getUser(JSON.parse(localStorage.getItem("user")).uid)
                if(selectedAccount === undefined){
                    setSelectedAccount(response.accounts[0])
                }
                setProfileInfo(response);
            }catch(error){
            }
        }
    }

    const getGamesInfo = async () => {
        try{
            let response = await gameService.getGames();
            setGames(response.games);
        }catch(error){
        }
    }

    const getGameName = (gameId) => {
        for(let game of games) {
            if(game.uid === gameId) {
                return game.name;
            }
        }
    }

    const onClickTab = (account) => {
        setSelectedAccount(account);
    }

    const profileToShow = () => {
        if(selectedAccount) {
            switch (getGameName(selectedAccount.game)) {
                case "League of Legends":
                    return <LoLProfile name={selectedAccount.leagueOfLegendsAccountInfo.gameName}
                                       puuid={selectedAccount.leagueOfLegendsAccountInfo.puuid}
                                       summonerId={selectedAccount.leagueOfLegendsAccountInfo.summonerId}
                                       tag={selectedAccount.leagueOfLegendsAccountInfo.tagLine}/>;
                default:
                    return <></>;
            }
        }
    }

    return <>
        <div className="main">
            <div className="flex vertical align-start gap-medium profile mt-4">
                <div className="header">
                    <ProfileHeader profileInfo={profileInfo} profileEdit={!userId} />
                </div>
                {
                    profileInfo.role === "USER" ?
                        <>
                            <div className="nav">
                                <ProfileNav accounts={profileInfo.accounts} onClickTab={onClickTab} selectedTab={selectedAccount} getGameName={getGameName}/>
                            </div>
                            <div className="">
                            {
                                selectedAccount ? profileToShow() : <></>
                            }
                            </div>
                        </>
                        :
                        <></>
                }

            </div>
        </div>
    </>
}

export default Profile;