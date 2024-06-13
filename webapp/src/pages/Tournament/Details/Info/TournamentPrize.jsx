function TournamentPrize({prize}){

    return <>
        <div className="tournament-prize">
            <div className="prize-img">
                <img src={prize.image} alt="" />
            </div>
            <div className="prize-info">
                <div className="prize-name">
                    {prize.name}
                </div>
                <div className="prize-desc">
                    {
                        prize.description === "" ? "Sin descripción" : prize.description
                    }
                </div>
            </div>
        </div>
    </>
}

export default TournamentPrize