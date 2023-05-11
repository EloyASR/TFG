function InputNumber({min, max, label, onChange, placeholder, defaultValue}) {
    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label>{label}</label>
                </div>
                <div className="form-field form-number">
                    <input type="number" onChange={(e)=>onChange(e)} placeholder={placeholder} min={min??null} max={max??null} defaultValue={defaultValue}/>
                </div>
            </div>
        </>
    );
}

export default InputNumber