import React from "react";
import { Form, useForm } from '../../hooks/useForm'
import loginService from '../../services/loginService'
import Input1 from "../../components/Input/Input1";
import './Login.css';

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
        resetForm()
        console.log(user)
        //console.log(result)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2> Inicio de sesión </h2>
            <div className="inputs">
                <Input1
                    type="text"
                    name="name"
                    label="Username"
                    value={values.name}
                    error={errors.name}
                    onChange={handleInputChange}
                />

                <Input1
                    type="password"
                    name="password"
                    label="Password"
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