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
            temp.name = fieldValues.name ? '' : 'This field is required'
        }
        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? '' : 'This field is required'
        }
        if ('password' in fieldValues) {
            if (!fieldValues.password) {
                temp.password = 'This field is required';
            } else {
                temp.password = "";
                if (!values.repeatpassword) {
                    temp.repeatpassword = errors.repeatpassword;
                } else {
                    if (fieldValues.password !== values.repeatpassword) {
                        temp.repeatpassword = "Passwords should match";
                    } else {
                        temp.repeatpassword = '';
                    }
                }
            }
        }
        if ('repeatpassword' in fieldValues) {
            if (!fieldValues.repeatpassword) {
                temp.repeatpassword = 'This field is required';
            } else {
                if (values.password !== fieldValues.repeatpassword) {
                    temp.repeatpassword = "Passwords should match";
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
            checkErrors.name = "This field is required"
        }
        if (!values.email) {
            checkErrors.email = "This field is required"
        }
        if (!values.password) {
            checkErrors.password = "This field is required"
        }
        if (!values.repeatpassword) {
            checkErrors.repeatpassword = "This field is required"
        }
        if (values.repeatpassword && values.password) {
            if (values.repeatpassword !== values.password) {
                checkErrors.repeatpassword = "Passwords should match";
            }
        }

        setErrors({ ...checkErrors })

        if (checkErrors.name || checkErrors.email || checkErrors.password || checkErrors.repeatpassword) {
            //SE HACE ALGUNA LIMPIEZA DE CAMPOS SI SE QUIERE
        } else {
            var data = {
                name: values.name,
                password: values.password,
                icon: iconSelected,
                email: values.email,
            }

            try{
                await signupService.signup(data);
                showAlert("User sign up succesfully", "success")
                navigate("/login");
            }catch (error){
                if (error.response.status === 400 && error.response.data.msg === "User with name:{" + values.name + "} already exists"){
                    checkErrors.name = "This name already exists";
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
                                <InputText label={"Username"} id={"name"} name={"name"} placeholder={"Username"} defaultValue={values.name} error={errors.name} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputText label={"Email"} id={"email"} name={"email"} placeholder={"Email"} defaultValue={values.email} error={errors.email} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputPassword label={"Password"} id={"password"} name={"password"} placeholder={"Password"} defaultValue={values.password} error={errors.password} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputPassword label={"Repeat Password"} id={"repeatpassword"} name={"repeatpassword"} placeholder={"Password"} defaultValue={values.repeatpassword} error={errors.repeatpassword} onChange={handleInputChange} />
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