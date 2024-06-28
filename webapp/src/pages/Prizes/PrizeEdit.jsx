import "./Prize.css";
import React from "react";
import InputText from "../components/InputText";
import InputTextarea from "../components/InputTextarea";
import ImageSelector from "../components/ImageSelector";
import {useEffect, useState} from "react";
import prizesService from "../../services/prizeService";
import {useNavigate} from "react-router";
import {Form, useForm} from "../../hooks/prizeForm";
import cloudinaryService from "../../services/cloudinaryService";
import prizeService from "../../services/prizeService";
import {useAlert} from "../../context/AlertContext";

function PrizeEdit({ prizeId }) {

    const navigate = useNavigate();
    const [prize, setPrize] = useState([]);
    const { showAlert } = useAlert();

    useEffect(() => {
        getPrize(prizeId);
    }, []);

    const getPrize = async (id) => {
        let data = await prizesService.getPrize(id);
        setPrize(data);
        setValues(data);
    }

    const defaultValues = {
        name: "",
        description: "",
        image: "",
    }

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? '' : 'This field is required'
        }
        if ('description' in fieldValues) {
            temp.description = fieldValues.description ? '' : 'This field is required'
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
        resetForm,
        handleInputChange
    } = useForm(defaultValues, true, validate)

    const updatePrize = async (e) => {
        e.preventDefault();

        let data = {}

        //Miramos los datos que han cambiado
        if (values.name !== prize.name) {
            data.name = values.name;
        }

        if (values.description !== prize.description) {
            data.description = values.description;
        }

        if (values.image !== prize.image) {
            if (typeof values.image !== 'string' || !(values.image instanceof String)) {
                if (values.image.length > 0) {

                    const url = prize.image;
                    const segments = url.split("/");
                    const lastSegment = segments[segments.length - 1];

                    const public_id = lastSegment.split(".")[0];

                    //Borramos la imagen antigua
                    await cloudinaryService.deleteFile(public_id)

                    //Establecemos la nueva imagen
                    data.image = await cloudinaryService.uploadFile(values.image[0]);
                }
            }
        }

        try {
            let result = await prizeService.updatePrize(prize.uid, {prize: data});
            resetForm();
            showAlert('Premio actualizado correctamente', "success");
        }catch (e) {
            showAlert('Ha ocurrido un problema actualizando el premio', "error");
        }

        navigate('/prizes');
    }

    return <>
        <div className="main">
            <Form onSubmit={updatePrize} >
                <div className="prize-create card">
                    <div className="card-header">
                        Prize Edit
                    </div>
                    <div className="card-content">
                        <div className="flex spacing-large size-content">
                            <div className="size-1-1">
                                <InputText label={"Name"} id={"name"} name={"name"} placeholder={"Name"} defaultValue={values.name} error={errors.name} onChange={handleInputChange} />
                            </div>
                            <div className="size-1-1">
                                <InputTextarea label={"Descripción"} id={"description"} name={"description"} placeholder={"Description"} defaultValue={values.description} error={errors.description} onChange={(e) => handleInputChange(e)}/>
                            </div>
                            <div className="size-1-1">
                                <div className="form-row image-selector">
                                    <label className="form-label" htmlFor="file">Actual Image</label>
                                    <div className="flex spacing-small">
                                        <div className="size-1-4 image-selected  mt-3">
                                            <img src={prize.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="size-1-1">
                                <ImageSelector label={"New Image"} maxImages={1} id={"image"} name={"image"} onChange={(e) => handleInputChange(e,"fileInput")}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex align-end size-1-1 spacing-large">
                            <div className="size-1-5">
                                <button type={"submit"}>
                                    Accept
                                </button>
                            </div>
                            <div className="size-1-5 delete">
                                <button type={"button"} onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </>
}

export default PrizeEdit;