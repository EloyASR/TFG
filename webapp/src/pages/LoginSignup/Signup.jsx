import React, { useState } from "react";
import { Form, useForm } from '../../hooks/signupForm'
import signupService from '../../services/signupService';
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import { images } from "../../helpers/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import {useAlert} from "../../context/AlertContext";

const defaultData = {
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
    icon: "icon_default.jpg"
}



const Signup = (props) => {

    const [imgModal, setImgModal] = useState(false);
    const [iconSelected, setIconSelected] = useState("icon_default.jpg");

    const { showAlert } = useAlert();

    const navigate = useNavigate();

    const validate = (fieldValues = values) => {

        const temp = { ...errors }

        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? '' : 'Campo obligatorio'
        }
        if ('email' in fieldValues) {
            if(!fieldValues.email) {
                temp.email = "Campo obligatorio";
            }else{
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if(emailRegex.test(values.email)){
                    temp.email = "";
                }else{
                    temp.email = "Formato de email invalido"
                }
            }
        }
        if ('password' in fieldValues) {
            if (!fieldValues.password) {
                temp.password = 'Campo obligatorio';
            } else {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
                if(regex.test(fieldValues.password)){
                    if(fieldValues.password.length<8){
                        temp.password = 'La contraseña debe tener una longitud mínima de 8 caracteres'
                    }else{
                        temp.password = '';
                    }
                }else{
                    temp.password = 'La contraseña debe tener al menos una minúscula, una mayúscula y un número'
                }

                if (fieldValues.password !== values.repeatpassword) {
                    temp.repeatpassword = "La contraseñas deben coincidir";
                } else {
                    temp.repeatpassword = '';
                }
            }
        }
        if ('repeatpassword' in fieldValues) {
            if (!fieldValues.repeatpassword) {
                temp.repeatpassword = 'Campo obligatorio';
            } else {
                if (values.password !== fieldValues.repeatpassword) {
                    temp.repeatpassword = "Las contraseñas deben coincidir";
                } else {
                    temp.repeatpassword = '';
                }
            }
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
        handleInputChange
    } = useForm(defaultData, true, validate)

    const handleSubmit = async e => {
        e.preventDefault()

        let checkErrors = { ...errors }

        if (!values.name) {
            checkErrors.name = "Campo obligatorio"
        }
        if (!values.email) {
            checkErrors.email = "Campo obligatorio"
        }else{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(emailRegex.test(values.email)){
                checkErrors.email = "";
            }else{
                checkErrors.email = "Formato de email invalido"
            }
        }
        if (!values.password) {
            checkErrors.password = "Campo obligatorio"
        }else{
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
            if(regex.test(values.password)){
                if(values.password.length<8){
                    checkErrors.password = 'La contraseña debe tener una longitud mínima de 8 caracteres'
                }else{
                    checkErrors.password = '';
                }
            }else{
                checkErrors.password = 'La contraseña debe tener al menos una minúscula, una mayúscula y un número'
            }
        }

        if (!values.repeatpassword) {
            checkErrors.repeatpassword = "Campo obligatorio"
        }
        if (values.repeatpassword && values.password) {
            if (values.repeatpassword !== values.password) {
                checkErrors.repeatpassword = "La contraseñas deben coincidir";
            }
        }

        setErrors({ ...checkErrors })

        if (checkErrors.name || checkErrors.email || checkErrors.password || checkErrors.repeatpassword) {
            //SE HACE ALGUNA LIMPIEZA DE CAMPOS SI SE QUIERE
        } else {
            let data = {
                name: values.name,
                password: values.password,
                icon: iconSelected,
                email: values.email,
            }

            try{
                await signupService.signup(data);
                showAlert("Usuario registrado correctamente", "success")
                navigate("/login");
            }catch (error){
                if (error.response.status === 400 && error.response.data.msg === "User with name:{" + values.name + "} already exists"){
                    checkErrors.name = "Nombre de usuario ya existente";
                    setErrors({ ...checkErrors });
                }
            }
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="flex vertical spacing-medium">
                    <div className="size-content">
                        <div className="signup-img">
                            <div className="image-container">
                                <img src={images("./profile_icons/" + iconSelected)} alt="" />
                                <div className="signup-icon-selector">
                                    <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        setImgModal(!imgModal)
                                    }}>
                                        <FontAwesomeIcon icon={faPen} size="xl" />
                                    </button>
                                </div>
                                {
                                    imgModal ?
                                        <div className="signup-icon-modal">
                                            <div className="flex">

                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_male_01.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_male_01.png")} alt="Icon Male 1" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_male_02.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_male_02.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_male_03.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_male_03.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_male_04.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_male_04.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_female_01.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_female_01.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_female_02.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_female_02.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_female_03.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_female_03.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_female_04.png");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_female_04.png")} alt="" />
                                                    </button>
                                                </div>
                                                <div className="img-picker-item size-1-4">
                                                    <button type="button" onClick={(e) => {
                                                        e.preventDefault();
                                                        setIconSelected("icon_default.jpg");
                                                        setImgModal(false);
                                                    }}>
                                                        <img src={images("./profile_icons/icon_default.jpg")} alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        : <></>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="inputs">
                        <div className="flex vertical spacing-medium">
                            <div className="size-content">
                                <InputText label={"Nombre de Usuario"} id={"name"} name={"name"} placeholder={"Nombre de Usuario"} defaultValue={values.name} error={errors.name} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputText label={"Email"} id={"email"} name={"email"} placeholder={"Email"} defaultValue={values.email} error={errors.email} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputPassword label={"Contraseña"} id={"password"} name={"password"} placeholder={"Contraseña"} defaultValue={values.password} error={errors.password} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputPassword label={"Repita la Contraseña"} id={"repeatpassword"} name={"repeatpassword"} placeholder={"Contraseña"} defaultValue={values.repeatpassword} error={errors.repeatpassword} onChange={handleInputChange} />
                            </div>
                            <div className="size-content flex spacing-top-large">
                                <button type="submit">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default Signup