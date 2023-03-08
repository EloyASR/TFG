import defaultIcon from '../../../../../assets/multimedia/icon_01.png';
import "./LoLQueue.css";

function LoLQueue({ ranked }) {

    if (ranked) {
        return <>
            <div className="lol-queue">
                <div className="header">Test queue</div>
                <div className="body">
                    <div className="icon">
                        <img src={defaultIcon} alt=""/>
                    </div>
                    <div className="info">
                        <div className="tier">Tier 0</div>
                        <div className="lp">00 LP</div>
                    </div>
                    <div className="rate">
                        <div className="w-l">
                            0W - 0L
                        </div>
                        <div className="winrate">WinRate 00%</div>
                    </div>
                </div>
            </div>
        </>;
    } else {
        return <>
            <div className="lol-queue">
                <div className="header">
                    Test queue
                    <span className="unranked">Unranked</span>
                </div>
            </div>
        </>;
    }

}

export default LoLQueue