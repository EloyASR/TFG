import defaultIcon from '../../../../assets/multimedia/icon_01.png';
import iron from '../../../../assets/multimedia/ranked/Iron.png';
import bronze from '../../../../assets/multimedia/ranked/Bronze.png';
import silver from '../../../../assets/multimedia/ranked/Silver.png';
import gold from '../../../../assets/multimedia/ranked/Gold.png';
import platinum from '../../../../assets/multimedia/ranked/Platinum.png';
import diamond from '../../../../assets/multimedia/ranked/Diamond.png';
import master from '../../../../assets/multimedia/ranked/Master.png';
import grandmaster from '../../../../assets/multimedia/ranked/Grandmaster.png';
import challenger from '../../../../assets/multimedia/ranked/Challenger.png';

function LoLQueue({ data }) {

    var ranked_icons = {
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

        console.log(iron);

        return <>
            <div className="lol-queue">
                <div className="header">{data.queueType === "RANKED_SOLO_5x5" ? "Solo Queue" : data.queueType === "RANKED_FLEX_SR" ? "Flex Queue" : "Test Queue"}</div>
                <div className="body">
                    <div className="icon">
                        <img src={ranked_icons[data.tier]} alt="" />
                    </div>
                    <div className="info">
                        <div className="tier">{data.tier.toLowerCase()} {data.rank}</div>
                        <div className="lp">{data.points} LP</div>
                    </div>
                    <div className="rate">
                        <div className="w-l">
                            {data.wins}W - {data.losses}L
                        </div>
                        <div className="winrate">WinRate {data.rate} %</div>
                    </div>
                </div>
            </div>
        </>;
    } else {
        return <>
            <div className="lol-queue">
                <div className="header">
                    {data.queueType === "RANKED_SOLO_5x5" ? "Solo Queue" : data.queueType === "RANKED_FLEX_SR" ? "Flex Queue" : "Test Queue"}
                    <span className="unranked">Unranked</span>
                </div>
            </div>
        </>;
    }
}

export default LoLQueue