function Player({name,icon}) {
    return (
        <>
            <div className="player">
                <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/" + icon +".png"} alt="" />
                <p>{name}</p>
            </div>
        </>
    );
}

export default Player