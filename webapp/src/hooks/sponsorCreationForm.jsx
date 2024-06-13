import React, { useState } from 'react'

export const useForm = (defaultData, validateOnChange = false, validate) => {
    const [values, setValues] = useState(defaultData)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e, inputType) => {
        console.log(e);
        console.log(inputType);

        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })

        if (validateOnChange) { validate({ [name]: value }) }
    }

    const resetForm = () => {
        setValues(defaultData)
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange
    }
}

export const Form = (props) => {
    const {children, ...other} = props

    return (
        <form className={"sponsorCreation-form"} autoComplete="off" {...other}>
            {children}
        </form>
    )
}