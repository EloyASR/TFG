import defaultIcon from '../../../../assets/multimedia/icon_01.png';

function LoLMastery(props) {
    return <>
        <div className="lol-mastery">
            <div className="icon">
                <img src={defaultIcon} alt="Icono Maestria" />
            </div>
            <div className="data">
                <div className="lvl">0</div>
                <div className="points">000 K</div>
            </div>
        </div>
    </>;
}

export default LoLMastery