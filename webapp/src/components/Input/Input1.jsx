import React from 'react'
import hide from "./icons8-hide-96.png"

const Input = (props) => {
    const { name, label, value, type, error = null, onChange, ...other } = props

    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            {type==="text"
                ? <input aria-invalid="false" id={name} name={name} type="text" placeholder={label} onChange={onChange} />
                : <>
                    <input aria-invalid="false" id={name} name={name} type="password" placeholder={label} onChange={onChange} /> 
                    <button>
                        <img src={hide} alt=""/>
                    </button>
                </>}
            <div style={{ color: 'red' }}>{error}</div>
        </div>
    )
}

export default Input
