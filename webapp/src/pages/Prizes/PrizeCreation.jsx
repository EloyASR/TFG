import "./Prize.css";
import React from "react";
import InputText from "../components/InputText";
import {Form, useForm} from "../../hooks/prizeForm";
import InputTextarea from "../components/InputTextarea";
import ImageSelector from "../components/ImageSelector";
import cloudinaryService from '../../services/cloudinaryService';
import prizeService from "../../services/prizeService";
import { useNavigate } from "react-router";
import { useAlert } from "../../context/AlertContext";

function PrizeCreation() {

    const navigate = useNavigate();
    const { showAlert } = useAlert();

    let defaultData = {
        name: "",
        description: "",
        image: [],
    }

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? '' : 'This field is required'
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values) { return Object.values(temp).every(x => x === '') }
    }

    const {
        values,
        errors,
        setErrors,
        resetForm,
        handleInputChange
    } = useForm(defaultData, true, validate)


    const createPrize = async e => {
        e.preventDefault();

        //SACAMOS LOS VALORES DE LA DESCRIPCION Y EL NOMBRE

        let url = ""

        if (values.image.length > 0){
            url = await cloudinaryService.uploadFile(values.image[0])
        }

        let creator = JSON.parse(localStorage.getItem("user")).uid

        let data = {
            name: values.name,
            description: values.description,
            image: url,
            creator: creator,
        }
        try {
            let result = await prizeService.createPrize(data);
            resetForm();
            showAlert('Premio creado correctamente', "success");
        }catch (e) {
            showAlert('Ha ocurrido un problema creando el premio', "error");
        }

        navigate('/prizes');
    }

    return <>
        <div className="main">
            <Form onSubmit={createPrize} >
                <div className="prize-create card">
                    <div className="card-header">
                        Creación de Premio
                    </div>
                    <div className="card-content">
                        <div className="flex spacing-large size-content">
                            <div className="size-1-1">
                                <InputText label={"Nombre *"} id={"name"} name={"name"} placeholder={"Nombre"} defaultValue={values.name} error={errors.name} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div className="size-1-1">
                                <InputTextarea label={"Descripción *"} id={"description"} name={"description"} placeholder={"Descripción"} defaultValue={values.description} error={errors.description} onChange={(e) => handleInputChange(e)}/>
                            </div>
                            <div className="size-all">
                                <ImageSelector label={"Imagen"} maxImages={1} id={"image"} name={"image"} onChange={(e) => handleInputChange(e)}/>
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
                                <button type="button" onClick={() => navigate(-1)}>
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

export default PrizeCreation;