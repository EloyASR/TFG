import React from "react";
import {Form, useForm} from "../../../../hooks/sponsorCreationForm";
import {useNavigate} from "react-router";
import {useAlert} from "../../../../context/AlertContext";
import ImageSelector from "../../../components/ImageSelector";
import HorizontalSpliter from "../../../components/HorizontalSpliter";
import Combobox from "../../List/Combobox";
import {useEffect, useState} from "react";
import prizeService from "../../../../services/prizeService";
import tournamentService from "../../../../services/tournamentService";

function SponsorTournament({tournamentId}) {

    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const [prizes, setPrizes] = useState([]);

    useEffect(() => {
        getPrizes();
    }, []);

    const getPrizes = async () => {
        let newPrizes = await prizeService.getPrizesByCreator(JSON.parse(localStorage.getItem("user")).uid)
        setPrizes(newPrizes.prizes)
    }

    let defaultData = {
        bannersHorizontales: [],
        bannersLaterales: [],
        prize: "",
    }

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        setErrors({
            ...temp
        })

        if (fieldValues === values) { return Object.values(temp).every(x => x === '') }
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(defaultData, true, validate)

    const patrocinarTorneo = async (e) => {
        e.preventDefault();

        let sponsor = {
            id: JSON.parse(localStorage.getItem("user")).uid,
            prize: values.prize,
            banners300x600: values.bannersLaterales,
            banners1100x300: values.bannersHorizontales,
        }

        let result = await tournamentService.patrocinarTorneo(tournamentId, sponsor);

        if(result.code  === 400) {
            showAlert(result.msg, "error");
        }else if (result.code === 200){
            showAlert(result.msg, "success");
            navigate(-1);
        }
    }

    const getPrizesNames = () => {
        let prizesNames = []
        prizesNames.push("-- No prize selected --");
        prizes.map((prize)=>prizesNames.push(prize.name));
        return prizesNames;
    }

    const handleComboChange = (item) => {
        if(item === "-- No prize selected --"){
            handleInputChange({target: {name: "prize", value: ""}})
        }else{
            let prizeFound = prizes.find((prize)=>prize.name === item)
            if(prizeFound){
                handleInputChange({target: {name: "prize", value: prizeFound.uid}})
            }else{
                handleInputChange({target: {name: "prize", value: ""}})
            }
        }
    }

    return <>
        <div className="main">
            <Form onSubmit={patrocinarTorneo}>
                <div className="prize-create card">
                    <div className="card-header">
                        Sponsor Tournament
                    </div>
                    <div className="card-content">
                        <div className="flex vertical spacing-large size-content">
                            <div className="flex align-spread spacing-large">
                                <div>
                                    Premio
                                </div>
                                <div className="flex align-middle size-all">
                                    <HorizontalSpliter color="white" />
                                </div>
                            </div>
                            <div className="flex align-spread spacing-large">
                                <div className="size-2-6">
                                    <Combobox id={"prize"} name={"prize"} itemsList={getPrizesNames()} label={"Prize"} placeholder={"Prize"} selection={"-- No prize selected --"} onChange={(item) => handleComboChange(item)} />
                                </div>
                            </div>
                            <div className="flex align-spread spacing-large">
                                <div>
                                    Banners Laterales (300x600)
                                </div>
                                <div className="flex align-middle size-all">
                                    <HorizontalSpliter color="white" />
                                </div>
                            </div>
                            <div className="size-all">
                                <ImageSelector label={"Image"} maxImages={2} id={"bannersLaterales"} name={"bannersLaterales"} onChange={(e) => handleInputChange(e)}/>
                            </div>
                            <div className="flex align-spread spacing-large">
                                <div>
                                    Banner Horizontal (1100x300)
                                </div>
                                <div className="flex align-middle size-all">
                                    <HorizontalSpliter color="white" />
                                </div>
                            </div>
                            <div className="size-all">
                                <ImageSelector label={"Image"} maxImages={1} id={"bannersHorizontales"} name={"bannersHorizontales"} onChange={(e) => handleInputChange(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex align-end size-1-1 spacing-large">
                            <div className="size-1-5">
                                <button type="submit">
                                    Aceptar
                                </button>
                            </div>
                            <div className="size-1-5 delete">
                                <button type="button" onClick={()=>navigate(-1)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </>
}

export default SponsorTournament;