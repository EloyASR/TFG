import React from 'react'
import TextField from '@mui/material/TextField';

const Input = (props) => {
    const { name, label, value, error = null, onChange, ...other } = props

    return (
        <TextField
            variant="filled"
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />

    )
}

export default Input
