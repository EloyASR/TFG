import SummonerItem from "./SummonerItem";
import SummonerWard from "./SummonerWard";

function Items({ data }) {
    return (
        <>
            <div className="items">
                <div>
                    <div>
                        <SummonerItem item={data.item0} />
                        <SummonerItem item={data.item1} />
                        <SummonerItem item={data.item2} />
                    </div>
                    <div>
                        <SummonerItem item={data.item3} />
                        <SummonerItem item={data.item4} />
                        <SummonerItem item={data.item5} />
                    </div>
                </div>
                <SummonerWard ward={data.item6} />
            </div>
        </>
    );
}

export default Items