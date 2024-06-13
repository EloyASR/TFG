function InputText({ label, onChange, placeholder, id, name, defaultValue, error, required, value, disabled, constraint}) {
    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label id={id + "-label"} htmlFor={id + "-input"}>
                        {label}
                        <span className="constraint">{constraint}</span>
                    </label>
                </div>
                <div className="form-field form-text">
                    {required ?
                        <input id={id + "-input"} name={name} type="text" onChange={(e) => onChange(e)} placeholder={placeholder} defaultValue={defaultValue} value={value} required={true} disabled={disabled}/>
                        :
                        <input id={id + "-input"} name={name} type="text" onChange={(e) => onChange(e)} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled}/>
                    }
                </div>
                {
                    error ?
                        <div className="form-error">
                            <small>{error}</small>
                        </div>
                        :
                        <></>
                }
            </div>
        </>
    );
}

export default InputText