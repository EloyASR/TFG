function InputText({label, onChange, placeholder, id, defaultValue}) {
    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label id={id + "-label"} htmlFor={id + "-input"}> {label} </label>
                </div>
                <div className="form-field form-text">
                    <input id={id + "-input"} type="text" onChange={(e)=>onChange(e)} placeholder={placeholder} defaultValue={defaultValue}/>
                </div>
            </div>
        </>
    );
}

export default InputText