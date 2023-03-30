import Summoner from "./Summoner";
import Items from "./Items";

function SummonerInfo({data}) {
    return (
        <>
            <div className="summoner_info">
                <Summoner data={data}/>
                <Items data={data}/>
            </div>
        </>
    );
}

export default SummonerInfo