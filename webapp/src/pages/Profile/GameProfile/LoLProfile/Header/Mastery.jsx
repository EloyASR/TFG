import defaultIcon from '../../../../../assets/multimedia/icon_01.png';

function Mastery({ data }) {
    if (data) {
        return <>
            <div className="lol-mastery">
                <div className="icon">
                    <img src={'http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/' + data.name + '.png'} alt="Icono Maestria" />
                </div>
                <div className="data">
                    <div className="lvl">0</div>
                    <div className="points">000 K</div>
                </div>
            </div>
        </>;
    } else {
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
}

export default Mastery;