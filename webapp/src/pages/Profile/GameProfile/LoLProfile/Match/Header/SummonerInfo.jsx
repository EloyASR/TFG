import Summoner from "./Summoner";
import Items from "./Items";

function SummonerInfo({data, runesData}) {
    return (
        <>
            <div className="summoner_info">
                <Summoner data={data} runesData={runesData}/>
                <Items data={data}/>
            </div>
        </>
    );
}

export default SummonerInfo