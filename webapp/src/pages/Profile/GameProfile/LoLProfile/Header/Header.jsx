import defaultIcon from '../../../../../assets/multimedia/icon_01.png';
import Mastery from './Mastery';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";


function Header({handleClick,data,name,tag}) {
    return <>
        <div className="lol-header">
            <div className="header">
                Perfil - League of Legends
            </div>
            <div className="body content">
                <div className="info">
                    <div className="icon">
                        {data.profileIconId ? <img src={"http://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/" + data.profileIconId + ".png"} alt="icono" />
                        : <img src={defaultIcon} alt="icono por defecto" />}
                    </div>
                    <div className="data">
                        <div className="nickname">{name && tag ? name + "#" + tag : "Nickname"}</div>
                        <div className="lvl">{data.summonerLevel ? "Lvl " + data.summonerLevel: "Lvl 0"}</div>
                        <div className="button accept add">
                            <button onClick={handleClick} className="update">
                                <FontAwesomeIcon icon={faRefresh}/>
                                Recargar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="masteries">
                    {data.masteries ? data.masteries.map((maestria)=> <Mastery key={maestria.name} data={maestria}/>)
                    :<>
                        <Mastery/>
                        <Mastery/>
                        <Mastery/>
                    </>}
                </div>
            </div>
        </div>
    </>;
}

export default Header