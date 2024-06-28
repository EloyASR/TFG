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
            temp.name = fieldValues.name ? '' : 'Campo obligatorio';

        }
        if ('password' in fieldValues) {
            if(fieldValues.password) {

            }else{
                temp.password = 'Campo obligatorio';
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

        try{
            const {user,token} = await loginService.login(values);

            if (!user) {
            } else {
                localStorage.setItem("session", token);
                localStorage.setItem("user", JSON.stringify(user));
                applyTheme();
            }

            if (localStorage.getItem("session") !== null) {
                if (decodeToken(localStorage.getItem("session")) !== null) {
                    if (!isExpired(localStorage.getItem("session"))) {
                        navigate("/profile");
                    };
                }
            }

        }catch (e){
            setErrors({
                ...errors,
                name: "Usuario o contraseña incorrectos"
            })
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
                                <InputText label={"Nombre de Usuario"} id={"name"} name={"name"} placeholder={"Nombre de Usuario"} defaultValue={values.name} error={errors.name} onChange={handleInputChange} />
                            </div>
                            <div className="size-content">
                                <InputPassword label={"Contraseña"} id={"password"} name={"password"} placeholder={"Contraseña"} defaultValue={values.password} error={errors.password} onChange={handleInputChange} />
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