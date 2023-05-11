import React from 'react'
//import hide from "../../../assets/multimedia/icons/icon-eye-hide.png"

const Input = (props) => {
    const { name, label, value, type, displayLabel, error = null, onChange} = props

    return (
        <div className="input">
            <div className="input-component">
                <label htmlFor={name} style={!displayLabel?{display:"none"}:{}} >{label}</label>
                {type === "text"
                    ? <input aria-invalid="false" id={name} value={value} name={name} type="text" placeholder={label} onChange={onChange} />
                    : <>
                        <input aria-invalid="false" id={name} value={value} name={name} type="password" placeholder={label} onChange={onChange} />
                        {/*
                        <button>
                            <img src={hide} alt="Password show password" />
                        </button>
                        */}
                    </>}
            </div>
            <div className="input-error" style={{ color: 'red' }}>{error}</div>
        </div>
    )
}

export default Input
