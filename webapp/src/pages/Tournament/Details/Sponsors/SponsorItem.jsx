import InputRadio from "../../../components/InputRadio";

function SponsorItem({sponsor, eliminarPatrocinio, showModal, setSponsorSelected, setPending}) {

    const onRevision = () => {
        showModal(true);
        setSponsorSelected(sponsor);
        setPending();
    }

    return <>
        <div className={"sponsor flex vertical size-1-3"}>
            <div className={"sponsor-header"}>
                Patrocinio
            </div>
            <div className={"sponsor-content"}>
                <div className={"size-1-1"}>
                    <div className={"flex spacing-large"}>
                        <div className={"flex align-center size-1-2"}>
                            <InputRadio label={"Premio"} itemsList={["Si","No"]} checked={sponsor.prize !== undefined ? "Si" : "No"} disabled={true}></InputRadio>
                        </div>
                        <div className={"flex align-center size-1-2"}>
                            <InputRadio label={"Banners 300x600"} itemsList={["Si","No"]} checked={sponsor.banners300x600 !== undefined && sponsor.banners300x600.length>0 ? "Si" : "No"} disabled={true}></InputRadio>
                        </div>
                        <div className={"flex align-center size-1-2"}>
                            <InputRadio label={"Banners 1100x300"} itemsList={["Si","No"]} checked={sponsor.banners1100x300 !== undefined && sponsor.banners1100x300.length>0 ? "Si" : "No"} disabled={true}></InputRadio>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"sponsor-footer flex horizontal"}>
                <div className={"flex horizontal size-1-1 spacing-medium gap-medium"}>
                    <div className={"size-1-2 accept"}>
                        <button onClick={()=>{onRevision()}}>
                            Revisar
                        </button>
                    </div>
                    <div className={"size-1-2 delete"}>
                        <button onClick={() => eliminarPatrocinio(sponsor.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SponsorItem;