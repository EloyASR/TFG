import HorizontalSpliter from "../../../components/HorizontalSpliter";
import React, {useEffect, useState} from "react";
import userService from "../../../../services/userService";
import {images} from "../../../../helpers/images";

function SeriesInfo({serie, onClose}) {

    const [homeParticipant, setHomeParticipant] = useState(undefined);
    const [awayParticipant, setAwayParticipant] = useState(undefined);


    useEffect(()=>{
        getParticipantsInfo();
    }, [serie])

    const getParticipantsInfo = async () => {
        console.log(serie);
        if(serie){
            if(serie.serieData.home_participant){
                let participant1 = await userService.getUser(serie.serieData.home_participant);
                setHomeParticipant(participant1);
            }else {
                setHomeParticipant(undefined);
            }

            if(serie.serieData.away_participant) {
                let participant2 = await userService.getUser(serie.serieData.away_participant);
                setAwayParticipant(participant2);
            }else {
                setAwayParticipant(undefined);
            }
        }
    }

    return <>
        <div className="modal-background">
            <article className="card modal-series-info">
                <div className="card-header">
                    Round {serie.roundNumber + 1} - Serie {serie.serieNumber + 1}
                </div>
                <div className="card-content">
                    <div className="flex vertical spacing-large">
                        <div>
                            <div className="flex align-around align-middle gap-large serie-visualizer p-large">
                                {
                                    homeParticipant !== undefined ?
                                        <>
                                            <p className={"serie-participant"}>{homeParticipant.name}</p>
                                            <img src={images("./profile_icons/" + homeParticipant.icon)} alt={"Icono participante " + homeParticipant.name}/>
                                        </>
                                        :
                                        <>
                                            <p className={"serie-participant"}>TBD</p>
                                            <img src={images("./profile_icons/icon_default.jpg")} alt={"Icono participante Home por defecto"}/>
                                        </>
                                }

                                <div className="flex vertical align-middle align-center">
                                    <p className={"result"}>
                                        0 - 0
                                    </p>
                                    {
                                        serie !== undefined && serie.serieData !== undefined?
                                            serie.serieData.status === "SCHEDULED" ?
                                                <p className={"status scheduled"}>
                                                    SCHEDULED
                                                </p>
                                                :
                                                serie.serieData.status === "IN_GAME" ?
                                                    <p className={"status playing"}>
                                                        IN GAME
                                                    </p>
                                                    :
                                                    serie.serieData.status === "FINISHED" ?
                                                        <p className={"status finished"}>
                                                            FINISHED
                                                        </p>
                                                        :
                                                        <p className={"status scheduled"}>
                                                            SCHEDULED
                                                        </p>
                                            :
                                            <p className={"status scheduled"}>
                                                SCHEDULED
                                            </p>


                                    }
                                </div>
                                {
                                    awayParticipant !== undefined ?
                                        <>
                                            <img src={images("./profile_icons/" + awayParticipant.icon)} alt={"Icono participante " + awayParticipant.name}/>
                                            <p className={"serie-participant"}>{awayParticipant.name}</p>
                                        </>
                                        :
                                        <>
                                            <img src={images("./profile_icons/icon_default.jpg")} alt={"Icono participante Away por defecto"}/>
                                            <p className={"serie-participant"}>TBD</p>
                                        </>
                                }
                            </div>
                        </div>
                        <div className="flex align-spread spacing-large">
                            <div className="flex align-middle size-all">
                                <HorizontalSpliter color="white" />
                            </div>
                            <div>
                                Matches
                            </div>
                            <div className="flex align-middle size-all">
                                <HorizontalSpliter color="white" />
                            </div>
                        </div>
                        <div className="flex align-center spacing-large">
                            {
                                serie !== undefined && serie.serieData !== undefined && serie.serieData.result.matches.length > 0 ?
                                    <>
                                        <p>
                                            Se han encontrado partidos
                                        </p>
                                    </>
                                    :
                                    <>
                                        <p>
                                            No se han encontrado partidos para esta serie
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-footer flex align-center">
                    <div className={"size-1-2 delete"}>
                        <button onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </article>
        </div>
    </>
}

export default SeriesInfo;