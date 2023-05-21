function InputText({ label, onChange, placeholder, id, name, defaultValue, error, required, value}) {
    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label id={id + "-label"} htmlFor={id + "-input"}> {label} </label>
                </div>
                <div className="form-field form-text">
                    {required ?
                        <input id={id + "-input"} name={name} type="text" onChange={(e) => onChange(e)} placeholder={placeholder} defaultValue={defaultValue} value={value} required={true}/>
                        :
                        <input id={id + "-input"} name={name} type="text" onChange={(e) => onChange(e)} placeholder={placeholder} defaultValue={defaultValue} />
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