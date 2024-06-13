import React from "react";
import { Form, useForm } from '../../hooks/loginForm';
import loginService from '../../services/loginService';
import InputPassword from "../components/InputPassword";
import InputText from "../components/InputText";
import { images } from "../../helpers/images";
import { isExpired, decodeToken } from "react-jwt";
import { applyTheme } from '../../context/theme';
import {useNavigate} from "react-router";

const defaultData = {
    name: "",
    password: ""
}

const Login = (props) => {

    const navigate = useNavigate();

    const validate = (fieldValues = values) => {
        const temp = { ...errors }
        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? '' : 'This field is required'
        }
        if ('password' in fieldValues) {
            temp.password = fieldValues.password ? '' : 'This field is required'
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

    const handleSubmit = async e => {
        e.preventDefault()
        const { user, token } = await loginService.login(values)
        if (!user) {
            console.log("usuario no valido")
        } else {
            console.log("usuario valido")
            localStorage.setItem("session", token);
            localStorage.setItem("user", JSON.stringify(user));
            applyTheme();
        }
        resetForm()
    }

    if (localStorage.getItem("session") !== null) {
        if (decodeToken(localStorage.getItem("session")) !== null) {
            if (!isExpired(localStorage.getItem("session"))) {
                navigate("/profile");
            };
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="flex vertical spacing-large">
                    <div className="size-content">
                        <div className="login-img">
                            <img src={images("./profile-default.jpg")} alt="" />
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="flex vertical spacing-medium">
                            <div className="size-content">
                                <InputText label={"Username"} id={"name"} name={"name"} placeholder={"Username or Email"} defaultValue={values.name} error={errors.name} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputPassword label={"Password"} id={"password"} name={"password"} placeholder={"Password"} defaultValue={values.password} error={errors.password} onChange={handleInputChange} />
                            </div>
                            <div className="size-content flex spacing-top-large">
                                <button type="submit">Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default Login