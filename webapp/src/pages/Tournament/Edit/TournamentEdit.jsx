import {Form} from "../../../hooks/tournamentEditForm";
import React, {useEffect, useState} from "react";
import InputTextarea from "../../components/InputTextarea";
import {useNavigate} from "react-router";
import Combobox from "../List/Combobox";
import tournamentService from "../../../services/tournamentService";
import prizeService from "../../../services/prizeService";
import {useForm} from "../../../hooks/prizeForm";
import InputText from "../../components/InputText";
import InputRadio from "../../components/InputRadio";
import {useAlert} from "../../../context/AlertContext";
import EditStatusModal from "./EditStatusModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

function TournamentEdit({tournamentId}) {

    const {showAlert} = useAlert();
    const[tournamentData, setTournamentData] = useState(undefined);
    const[prizes, setPrizes] = useState([]);
    const[prizeSelected, setPrizeSelected] = useState(undefined);
    const[statusSelected, setStatusSelected] = useState(undefined);
    const[tournamentHavePrize, setTournamentHavePrize] = useState(false);
    const[showModal, setShowModal] = useState(false);
    const[pendingValues, setPendingValues] = useState(undefined);
    const navigate = useNavigate();

    useEffect(()=>{
        getData();
    }, [])

    const defaultValues = {
        name:"",
        prize:"",
        description: "",
        rules: "",
        status: "",
    }

    const getData = async () => {
        const data = await tournamentService.getTournament(tournamentId)
        setValues({
            name: data.name,
            prize:data.prize,
            description: data.description,
            rules: data.rules,
            status: data.status,
        })

        let newPrizes = await prizeService.getPrizesByCreator(JSON.parse(localStorage.getItem("user")).uid)
        setPrizes(newPrizes.prizes)

        let prize = newPrizes.prizes.find(p=>p.uid===data.prize);

        if(prize) {
            setPrizeSelected(prize);
            setTournamentHavePrize(true);
        }else{
            setPrizeSelected(undefined);
            setTournamentHavePrize(false);
        }

        setStatusSelected(data.status);

        setTournamentData(data);
    }

    const getPrizesNames = () => {
        let prizesNames = []
        prizes.map((prize)=>prizesNames.push(prize.name));
        return prizesNames;
    }

    const getStatusNames = () => {
        let statusNames = []

        if(tournamentData && tournamentData.status === "CLOSED") {
            statusNames = [
                "Cerrado",
                "Inscripciones Abiertas",
            ]
        }

        if(tournamentData && tournamentData.status === "INSCRIPTIONS_OPEN") {
            statusNames = [
                "Inscripciones Abiertas",
                "Inscripciones Cerradas",
            ]
        }

        if(tournamentData && tournamentData.status === "INSCRIPTIONS_CLOSED") {
            statusNames = [
                "Inscripciones Cerradas",
                "En curso"
            ]
        }

        if(tournamentData && tournamentData.status === "ON_COURSE") {
            if(tournamentData.phases.length <= tournamentData.currentPhase){
                statusNames = [
                    "En curso",
                    "Finalizado"
                ]
            }else{
                statusNames = [
                    "En curso"
                ]
            }
        }

        if(tournamentData && tournamentData.status === "FINISHED") {
            statusNames = [
                "Finalizado"
            ]
        }

        return statusNames;
    }

    const getStatusName = (value) => {
        let statusWithNames = [
            {
                name: "Cerrado",
                value: "CLOSED",
            },
            {
                name: "Inscripciones Abiertas",
                value: "INSCRIPTIONS_OPEN",
            },
            {
                name: "Inscripciones Cerradas",
                value: "INSCRIPTIONS_CLOSED",
            },
            {
                name: "En curso",
                value: "ON_COURSE",
            },
            {
                name: "Finalizado",
                value: "FINISHED",
            }
        ]

        return statusWithNames.find((s) => s.value === value).name;
    }

    const getStatusValue = (name) => {
        let statusWithNames = [
            {
                name: "Cerrado",
                value: "CLOSED",
            },
            {
                name: "Inscripciones Abiertas",
                value: "INSCRIPTIONS_OPEN",
            },
            {
                name: "Inscripciones Cerradas",
                value: "INSCRIPTIONS_CLOSED",
            },
            {
                name: "En curso",
                value: "ON_COURSE",
            },
            {
                name: "Finalizado",
                value: "FINISHED",
            }
        ]

        return statusWithNames.find((s) => s.name === name).value;
    }

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        if ('name' in fieldValues) {
            if(fieldValues.name){
                if(fieldValues.name.length < 30) {
                    temp.name = '';
                }else{
                    temp.name = 'El nombre debe tener máximo de 30 caracteres';
                }
            }else {
                temp.name = 'This field is required';
            }
        }

        if ('prize' in fieldValues) {
            temp.prize = fieldValues.prize ? '' : 'This field is required';
        }

        if ('status' in fieldValues) {
            temp.status = fieldValues.status ? '' : 'This field is required';
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values) { return Object.values(temp).every(x => x === '') }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(defaultValues, true, validate)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let checkErrors = { ...errors }

        if (!values.name) {
            checkErrors.name = "This field is required"
        }
        if (tournamentHavePrize && !values.prize) {
            checkErrors.prize = "This field is required"
        }

        setErrors({ ...checkErrors })

        if (checkErrors.name || checkErrors.prize) {
            //SE HACE ALGUNA LIMPIEZA DE CAMPOS SI SE QUIERE
        } else {

            let valuesToSend = {
                name: values.name,
                description: values.description,
                rules: values.rules,
                status: values.status,
            }

            if(tournamentHavePrize) {
                valuesToSend.prize = prizeSelected.uid
            }

            let result = undefined;

            if(tournamentData.status === values.status){
                result = await tournamentService.updateTournament(tournamentId, valuesToSend);
                if(result.code === 200){
                    showAlert(result.msg, "success")
                    navigate("/tournament/" + tournamentId);
                }else {
                    showAlert(result.msg, "error")
                }
            }else{
                setPendingValues(valuesToSend);
                setShowModal(true);
            }
        }
    }

    const handleConfirm = async () => {
        let valuesToSend = {
            name: pendingValues.name,
            description: pendingValues.description,
            rules: pendingValues.rules,
            status: pendingValues.status,
        };

        if (tournamentHavePrize) {
            valuesToSend.prize = prizeSelected.uid;
        }

        let result = await tournamentService.updateTournament(tournamentId, valuesToSend);

        if (result.code === 200) {
            showAlert(result.msg, "success");
            navigate("/tournament/" + tournamentId);
        } else {
            showAlert(result.msg, "error");
        }

        setShowModal(false);
    }

    const handleCancel = () => {
        setPendingValues(undefined);
        setShowModal(false);
    };

    const handleRadioChange = (e) => {
        setTournamentHavePrize(e === "Sí");
    }

    const handlePrizeChange = (item) => {
        let prize = prizes.find(p=>p.name===item);
        if(prize !== undefined && tournamentHavePrize) {
            setPrizeSelected(prize);
            handleInputChange({target:{name: "prize", value: prize.uid}})
        }else{
            setPrizeSelected(undefined);
            handleInputChange({target:{name: "prize", value: ""}})
        }
    }

    const handleStatusChange = (item) => {
        setStatusSelected(getStatusValue(item));
        handleInputChange({target: {name: "status", value: getStatusValue(item)}});
    }

    const handleDeleteTournament = async () => {
        try{
            await tournamentService.deleteTournament(tournamentId, JSON.parse(localStorage.getItem('user')).uid);
            showAlert("Torneo eliminado con éxito", "success");
        }catch(e){
            showAlert("Se ha producido un error al intentar eliminar el torneo", "error");
        }
        navigate("/my-tournaments");
    }

    return <>
        <div className="main">
            <Form onSubmit={handleSubmit}>
                <div className="edit-profile card">
                    <div className="card-header">
                        Edit Tournament
                    </div>
                    <div className="card-content">
                        <div className="size-content">
                            <div className="flex vertical align-top spacing-large">
                                <div className="inputs flex vertical gap-large size-1-1">
                                    <div className="flex spacing-large align-end size-1-1">

                                    </div>
                                    <div className="flex spacing-large align-bottom size-1-1">
                                        {
                                            tournamentData !== undefined ?
                                                <>
                                                    <div className="size-4-6">
                                                        <div className="form-row">
                                                            <div className="own-form-text">
                                                                <InputText id="name" type="text" label={"Nombre del torneo *"} constraint={"(30 caracteres máximo)"} error={errors.name} defaultValue={tournamentData.name} placeholder="Nombre del torneo" name="name" maxLength="30" onChange={handleInputChange}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        tournamentData && (tournamentData.status === "CLOSED" || tournamentData.status === "INSCRIPTIONS_OPEN" || tournamentData.status === "INSCRIPTIONS_CLOSED") ?
                                                        <div className="size-2-6 delete">
                                                            <button type="button" onClick={()=>handleDeleteTournament()}>
                                                                <FontAwesomeIcon icon={faTrashCan}/> Eliminar Torneo
                                                            </button>
                                                        </div>
                                                        :
                                                        <></>
                                                    }
                                                    <div className="size-1-2">
                                                        <div className="form-row">
                                                            <div className="own-form-text">
                                                                <Combobox id={"status"} name={"status"} itemsList={getStatusNames()} label={"Estado *"} placeholder={"Estado"} selection={ statusSelected ? getStatusName(statusSelected) : ""} error={errors.status} onChange={(item) => {handleStatusChange(item)}} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="size-1-1">
                                                        <InputTextarea label={"Descripción"} name="description" id="description" placeholder={"Descripción del torneo"} defaultValue={tournamentData.description} onChange={handleInputChange}/>
                                                    </div>
                                                    <div className="size-1-1">
                                                        <InputTextarea label={"Reglas"} name="rules" id="rules" placeholder={"Reglas del torneo"} defaultValue={tournamentData.rules} onChange={handleInputChange}/>
                                                    </div>
                                                    {
                                                        tournamentData !== undefined ?
                                                            <>
                                                                <div className="size-1-3">
                                                                    <InputRadio label={"¿Torneo con premio?"} itemsList={["Sí", "No"]} checked={tournamentHavePrize ? "Sí" : "No"} id={"have-prize"} name={"have-prize"} onChange={(e) => handleRadioChange(e)}/>
                                                                </div>
                                                                {
                                                                    tournamentHavePrize ?
                                                                        <div className="size-2-3">
                                                                            <Combobox id={"prize"} name={"prize"} itemsList={getPrizesNames()} label={"Premio *"} placeholder={"Premio"} selection={ prizeSelected ? prizeSelected.name : ""} error={errors.prize} onChange={(item) => {handlePrizeChange(item)}} />
                                                                        </div>
                                                                        :
                                                                        <></>
                                                                }
                                                            </>
                                                            :
                                                            <></>
                                                    }

                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex align-end size-1-1 spacing-large">
                            <div className="size-1-5 accept">
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
            {
                showModal ?
                    <EditStatusModal newStatus={values.status} onConfirm={handleConfirm} onCancel={handleCancel}/>
                    :
                    <></>
            }
        </div>
    </>
}

export default TournamentEdit;