function Player(props) {
    return (
        <>
            <div className="player">
                <img src="../multimedia/icon_01.png" alt="" />
                <p>{props.name}</p>
            </div>
        </>
    );
}

export default Player