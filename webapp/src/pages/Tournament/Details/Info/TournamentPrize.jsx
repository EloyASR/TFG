import {images} from "../../../../helpers/images";

function TournamentPrize({prize}){

    return <>
        <div className="tournament-prize">
            <div className="prize-img">
                {
                    prize.image ?
                        <img src={prize.image} alt={"Imagen premio" + prize.image} />
                        :
                        <img src={images("./default_prize.png")} alt="Imagen por defecto premio"/>
                }

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