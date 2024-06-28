import {images} from "../../../../../helpers/images";

function Player({position,icon}) {
    return (
        <>
            <div className="player">
                <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/" + icon +".png"} alt="" className={"icon"}/>
                <img src={images("./"+ position +"_icon.png")} alt="" className={"role"}/>
            </div>
        </>
    );
}

export default Player;