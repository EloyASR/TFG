import React from "react";
import PrizeSelected from "./PrizeSelected";
import '../../../../App.css';

function SponsorDetails({sponsor, onClose, pending, aprobarPatrocinio}){
    return <div className="modal-background">
        <div className="card modal-sponsor-details">
            <div className="card-header">
                Detalles del patrocinio
            </div>
            <div className="card-content">
                <div className="flex vertical spacing-large size-content">
                    {
                        sponsor.prize ?
                            <div className="size-1-1 ">
                                <div className={"flex vertical spacing-medium"}>
                                    <h3>Premio</h3>
                                    <div>
                                        <PrizeSelected prizeId={sponsor.prize}/>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        sponsor !== undefined && sponsor.banners300x600.length > 0 ?
                            <div className="size-1-1">
                                <div className="flex vertical spacing-medium">
                                    <h3>Banners 300x600</h3>
                                    <div className="flex spacing-small">
                                        {
                                            sponsor.banners300x600.map((banner, index) => {
                                                return <div className="size-1-4">
                                                    <div className={"banner300x600-revision"}>
                                                        <img src={banner + ""} alt={"Banner 300x600 " + index}/>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        sponsor !== undefined && sponsor.banners1100x300.length > 0 ?
                            <div className="size-1-1">
                                <div className="flex vertical spacing-medium">
                                    <h3>Banners 970x90</h3>
                                    <div className="flex spacing-small">
                                        {
                                            sponsor.banners1100x300.map((banner, index) => {
                                                return <div className="size-1-1">
                                                    <div className={"banner970x90-revision"}>
                                                        <img src={banner + ""} alt={"Banner 970x90 " + index}/>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
            <div className="card-footer">
                {
                    pending ?
                        <div className={"flex spacing-medium size-1-1"}>
                            <div className={"size-1-2 accept"}>
                                <button onClick={() => {
                                    aprobarPatrocinio(sponsor.id)
                                    onClose()
                                }}>
                                    Aprobar
                                </button>
                            </div>
                            <div className={"size-1-2 delete"}>
                                <button onClick={() => {
                                    onClose()
                                }}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                        :
                        <div className={"flex spacing-medium size-1-1"}>
                            <div className={"size-1-1 delete"}>
                                <button onClick={() => {
                                    onClose()
                                }}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                }
            </div>
        </div>
    </div>
}

export default SponsorDetails;