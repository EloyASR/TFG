function InputNumber({ min, max, label, onChange, placeholder, defaultValue, disabled }) {
    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label>{label}</label>
                </div>
                <div className="form-field form-number">
                    {disabled ?
                        <input type="number" onChange={(e) => onChange(e)} placeholder={placeholder} min={min ?? null} max={max ?? null} defaultValue={defaultValue} disabled />
                        :
                        <input type="number" onChange={(e) => onChange(e)} placeholder={placeholder} min={min ?? null} max={max ?? null} defaultValue={defaultValue} />
                    }
                </div>
            </div>
        </>
    );
}

export default InputNumber