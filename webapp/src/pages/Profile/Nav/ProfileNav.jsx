import "./ProfileNav.css"

function ProfileNav({accounts, onClickTab, selectedTab, getGameName}){

    const isSelectedAccount = (account) => {
        return selectedTab ? selectedTab._id === account._id : false;
    }

    const getLabel = (account) => {
        switch(getGameName(account.game)){
            case "League of Legends":
                return "League of Legends (" + account.leagueOfLegendsAccountInfo.gameName + "#" + account.leagueOfLegendsAccountInfo.tagLine + ")";
            case "Valorant":
                return "Valorant (" + account.valorantAccountInfo.gameName + "#" + account.valorantAccountInfo.tagLine + ")";
            case "Pokemon VGC":
                return "Pokemon VGC (" + account.pokemonVGCAccountInfo.profileId + ")";
            default:
                return "";
        }
    }

    return <>
        <div className="nav-menu flex horizontal gap-medium">
            {
                accounts.map((account)=>{
                    return <button className={isSelectedAccount(account) ? "selected" : "not-selected"} onClick={()=>onClickTab(account)}>
                        {getLabel(account)}
                    </button>
                })
            }
        </div>
    </>;
}

export default ProfileNav