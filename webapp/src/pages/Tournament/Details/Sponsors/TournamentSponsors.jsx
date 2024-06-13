import {useOutletContext} from "react-router";
import {useEffect, useState} from "react";
import tournamentService from "../../../../services/tournamentService";
import SponsorItem from "./SponsorItem";
import SponsorDetails from "./SponsorDetails";

function TournamentSponsors(props) {

    const {tournamentId, eliminarPatrocinio, aprobarPatrocinio} = useOutletContext();

    const [tournamentData, setTournamentData] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [sponsorSelected, setSponsorSelected] = useState(undefined);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        getTournamentData();
    }, [tournamentData])

    const getTournamentData = async () => {
        let result = await tournamentService.getTournament(tournamentId);
        setTournamentData(result);
    }

    const eliminarPatrocinioYRecarga = async (patrocinio) => {
        eliminarPatrocinio(patrocinio);
        await getTournamentData();
    }

    const aprobarPatrocinioYRecarga = async (patrocinio) => {
        aprobarPatrocinio(patrocinio);
        await getTournamentData();
    }

    return <>
        <div className={"card"}>
            <div className={"card-header"}>
                Patrocinadores
            </div>
            <div className={"card-content"}>
                <div className={"flex vertical spacing-large"}>
                    <div className={"flex vertical gap-medium"}>
                        <div>
                            <h2>Patrocinios pendientes</h2>
                        </div>
                        <div className={"flex horizontal spacing-large"}>
                            {
                                tournamentData !== undefined && tournamentData.sponsoredBy.filter(sponsor => sponsor.status === "PENDING").length > 0 ?
                                    tournamentData.sponsoredBy.map((patrocinio, index) => {
                                        if(patrocinio.status === "PENDING"){
                                            return <SponsorItem key={"pending-sponsor-" + index} sponsor={patrocinio} showModal={setShowModal} setSponsorSelected={setSponsorSelected} setPending={()=>setPending(true)} eliminarPatrocinio={eliminarPatrocinio}/>
                                        }else{
                                            return <></>;
                                        }
                                    })
                                    :
                                    <p>No existen patrocinios pendientes de aprobación</p>
                            }
                        </div>
                    </div>
                    <div className={"flex vertical gap-medium"}>
                        <div>
                            <h2>Patrocinios aprobados</h2>
                        </div>
                        <div className={"flex horizontal spacing-large"}>
                            {
                                tournamentData !== undefined && tournamentData.sponsoredBy.filter(sponsor => sponsor.status === "ACCEPTED").length > 0 ?
                                    tournamentData.sponsoredBy.map((patrocinio,index) => {
                                        if(patrocinio.status === "ACCEPTED"){
                                            return <SponsorItem key={"accepted-sponsor-" + index} sponsor={patrocinio} showModal={setShowModal} setSponsorSelected={setSponsorSelected} setPending={()=>setPending(false)} eliminarPatrocinio={eliminarPatrocinioYRecarga}/>
                                        }else {
                                            return <></>
                                        }
                                    })
                                    :
                                    <p>No existen patrocinios aprobados</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={"card-footer"}>

            </div>
        </div>
        {
            showModal && sponsorSelected !== undefined ?
                <SponsorDetails onClose={()=>setShowModal(false)} sponsor={sponsorSelected} pending={pending} aprobarPatrocinio={aprobarPatrocinioYRecarga}/>
                :
                <></>
        }
    </>
}

export default TournamentSponsors