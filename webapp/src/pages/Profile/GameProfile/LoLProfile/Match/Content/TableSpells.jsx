import defaultIcon from '../../../../../../assets/multimedia/icon_01.png';

function TableSpells({ data }) {
    return <>
        <div className="table-spells">
            <img src={"http://ddragon.leagueoflegends.com/cdn/13.6.1/img/spell/" + getSummonerId(data.summoner1Id) + ".png"} alt="Spell icon" />
            <img src={"http://ddragon.leagueoflegends.com/cdn/13.6.1/img/spell/" + getSummonerId(data.summoner2Id) + ".png"} alt="Spell icon" />
        </div>
    </>;
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


export default TableSpells