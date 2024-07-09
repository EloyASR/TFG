import iron from '../../../../../assets/multimedia/ranked/Iron.png';
import bronze from '../../../../../assets/multimedia/ranked/Bronze.png';
import silver from '../../../../../assets/multimedia/ranked/Silver.png';
import gold from '../../../../../assets/multimedia/ranked/Gold.png';
import platinum from '../../../../../assets/multimedia/ranked/Platinum.png';
import diamond from '../../../../../assets/multimedia/ranked/Diamond.png';
import master from '../../../../../assets/multimedia/ranked/Master.png';
import grandmaster from '../../../../../assets/multimedia/ranked/Grandmaster.png';
import challenger from '../../../../../assets/multimedia/ranked/Challenger.png';

function Queue({ data }) {

    let ranked_icons = {
        "IRON": iron,
        "BRONZE": bronze,
        "SILVER": silver,
        "GOLD": gold,
        "PLATINUM": platinum,
        "DIAMOND": diamond,
        "MASTER": master,
        "GRANDMASTER": grandmaster,
        "CHALLENGER": challenger
    }


    if (data.ranked) {

        return <>
            <div className="lol-queue">
                <div className="header">{data.queueType === "RANKED_SOLO_5x5" ? "Clasificatoria en Solitario" : data.queueType === "RANKED_FLEX_SR" ? "Clasificatoria Flexible" : ""}</div>
                <div className="body">
                    <div className="icon">
                        <img src={ranked_icons[data.tier]} alt={"Icono " + data.tier} />
                    </div>
                    <div className="info">
                        <div className="tier">{data.tier.toLowerCase()} {data.rank}</div>
                        <div className="lp">{data.points} LP</div>
                    </div>
                    <div className="rate">
                        <div className="w-l">
                            {data.wins}V - {data.losses}D
                        </div>
                        <div className="winrate">Ratio de Victoria {data.rate} %</div>
                    </div>
                </div>
            </div>
        </>;
    } else {
        return <>
            <div className="lol-queue">
                <div className="header">
                    {data.queueType === "RANKED_SOLO_5x5" ? "Clasificatoria en Solitario" : data.queueType === "RANKED_FLEX_SR" ? "Clasificatoria Flexible" : ""}
                    <span className="unranked">Sin clasificar</span>
                </div>
            </div>
        </>;
    }
}

export default Queue