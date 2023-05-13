import React from "react";
import { Form, useForm } from '../../hooks/useForm'
import loginService from '../../services/loginService'
import Input from "./components/Input";

const defaultData = {
    name: "",
    password: ""
}

const Login = (props) => {

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
        const { user } = await loginService.login(values)
        if(!user){
            console.log("usuario no valido")
        }else{
            console.log("usuario valido")
            localStorage.setItem("cookie", user);
        }
        resetForm()
        console.log(user);
        console.log(localStorage.getItem("cookie"));
    }

    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            <div className="inputs">
                <Input
                    type="text"
                    name="name"
                    label="Username"
                    displayLabel={false}
                    value={values.name}
                    error={errors.name}
                    onChange={handleInputChange}
                />

                <Input
                    type="password"
                    name="password"
                    label="Password"
                    displayLabel={false}
                    value={values.password}
                    error={errors.password}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Submit</button>
        </Form>
    )
}

export default Login