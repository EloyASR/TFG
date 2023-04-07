import defaultIcon from '../../../../../assets/multimedia/icon_01.png';
import Mastery from './Mastery';


function Header({handleClick,data}) {
    return <>
        <div className="lol-header">
            <div className="header">
                LoL - Profile
            </div>
            <div className="body content">
                <div className="info">
                    <div className="icon">
                        {data.profileIconId ? <img src={"http://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/" + data.profileIconId + ".png"} alt="icono" />
                        : <img src={defaultIcon} alt="icono por defecto" />}
                    </div>
                    <div className="data">
                        <div className="nickname">{data.name ? data.name: "Nickname"}</div>
                        <div className="lvl">{data.summonerLevel ? "Lvl " + data.summonerLevel: "Lvl 0"}</div>
                        <div className="button">
                            <button onClick={handleClick} className="update">Update</button>
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