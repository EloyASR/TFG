import defaultIcon from '../../../../../assets/multimedia/icon_01.png';
import LoLMastery from './Mastery/LoLMastery';
import "./LoLHeader.css";

function LoLHeader(props) {
    return <>
        <div className="lol-header">
            <div className="header">
                Profile
            </div>
            <div className="body content">
                <div className="info">
                    <div className="icon">
                        <img src={defaultIcon} alt="" />
                    </div>
                    <div className="data">
                        <div className="nickname">Nickname</div>
                        <div className="lvl">LvL 0</div>
                        <div className="button">
                            <button className="update">Update</button>
                        </div>
                    </div>
                </div>
                <div className="masteries">
                    <LoLMastery/>
                    <LoLMastery/>
                    <LoLMastery/>
                </div>
            </div>
        </div>
    </>;
}

export default LoLHeader