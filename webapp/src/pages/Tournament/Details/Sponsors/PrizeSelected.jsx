import {images} from "../../../../helpers/images";
import {useEffect, useState} from "react";
import prizeService from "../../../../services/prizeService";

function PrizeSelected({prizeId}) {

    const [prize, setPrize] = useState(undefined);

    useEffect(() => {
        getPrize()
    }, [])

    const getPrize = async () => {
        let result = await prizeService.getPrize(prizeId);
        setPrize(result)
    }

    return <>
        <div className = "prize-selected">
            <div className="prize-img">
                {
                    prize && prize.image !== "" ?
                        <img src={prize.image} alt={"Imagen premio " + prize.name} />
                        :
                        <img src={images("./default_prize.png")} alt="Imagen por defecto premio"/>
                }
            </div>
            <div className="prize-info">
                <div className="prize-name">
                    {prize !== undefined ? prize.name : ""}
                </div>
                <div className="prize-desc">
                    {prize !== undefined ? prize.description : ""}
                </div>
            </div>
        </div>
    </>
}

export default PrizeSelected;