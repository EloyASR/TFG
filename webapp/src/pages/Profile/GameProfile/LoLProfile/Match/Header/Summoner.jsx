function Summoner({data, runesData}) {

    const searchPrincipalRuneImage =  () => {
        if(runesData !== undefined && data){
            let runaPadre = runesData.find((rune) => rune.slots[0].runes.find((r)=>r.id === data.perks.styles[0].selections[0].perk));
            if(runaPadre){
                let runaHija = runaPadre.slots[0].runes.find((rune)=>rune.id === data.perks.styles[0].selections[0].perk);
                return runaHija;
            }else{
                return null;
            }
        }
    }

    return (
        <>
            <div className="summoner">
                <div className="icons">
                    <div className="champion">
                        <div>
                            <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/"+ data.championName+".png"} alt="Champion icon" />
                        </div>
                        <div className="lvl">
                            <p>{data.champLevel}</p>
                        </div>
                    </div>
                    <div className="spells">
                        <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/spell/"+getSummonerId(data.summoner1Id) +".png"} alt="Spell icon" />
                        <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/spell/"+getSummonerId(data.summoner2Id) +".png"} alt="Spell icon" />
                    </div>
                    <div className="runes">
                        {
                            runesData && searchPrincipalRuneImage() !== null?
                                <img src={"http://ddragon.leagueoflegends.com/cdn/img/"+ searchPrincipalRuneImage().icon } alt="Rune icon" />
                                :
                                <img src="http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png" alt="Rune icon" />
                        }
                        {
                            runesData && runesData.find((rune) => rune.id === data.perks.styles[1].style)?
                                <img
                                    src={"http://ddragon.leagueoflegends.com/cdn/img/" + runesData.find((rune) => rune.id === data.perks.styles[1].style).icon}
                                    alt="Rune icon"/>
                                :
                                <img
                                    src="http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png"
                                    alt="Rune icon"/>
                        }
                    </div>
                </div>
                <div className="kda">
                    <div className="k-d-a">
                        <span className="k">{data.kills}</span>
                        /
                        <span className="d">{data.deaths}</span>
                        /
                        <span className="a">{data.assists}</span>
                    </div>
                    <div className="ratiokda">
                        <span>
                            {
                                data.deaths !== 0 ?
                                    Math.trunc((data.kills+data.assists)/data.deaths*100)/100 + ":1"
                                    :
                                    "Perfect(" + (data.kills+data.assists) + "):1"
                            }
                        </span>
                        KDA
                    </div>
                </div>
                <div className="stats"></div>
            </div>
        </>
    );
}

function getSummonerId(key){
    switch(key) {
        case 1:
            return "SummonerBoost";
        case 3:
            return "SummonerExhaust";
        case 4:
            return "SummonerFlash";
        case 6:
            return "SummonerHaste";
        case 7:
            return "SummonerHeal";
        case 11:
            return "SummonerSmite";
        case 12:
            return "SummonerTeleport";
        case 13:
            return "SummonerMana";
        case 14:
            return "SummonerDot";
        case 21:
            return "SummonerBarrier";
        case 30:
            return "SummonerPoroRecall";
        case 31:
            return "SummonerPoroThrow";
        case 32:
            return "SummonerSnowball";
        case 39:
            return "SummonerSnowURFSnowball_Mark";
        case 54:
            return "Summoner_UltBookPlaceholder";
        case 55:
            return "Summoner_UltBookSmitePlaceholder";
        default:
            return "SummonerFlash";
    }
}

export default Summoner