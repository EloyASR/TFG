function InputNumber({ id, name, min, max, label, onChange, placeholder, defaultValue, disabled }) {


    const onChangeInput = (e) => {

        console.log(min);
        console.log(max);
        console.log(Number(e.target.value))

        console.log(e);

        console.log((min !== null && min !== undefined) && (Number(e.target.value) < min))
        console.log((max !== null && max !== undefined) && (Number(e.target.value) > max))

        if((min !== null && min !== undefined) && (Number(e.target.value) < min)) {
            console.log("Menor que el mínimo")
            e.target.value = min + "";
            onChange(e);
            return;
        }

        if((max !== null && max !== undefined) && (Number(e.target.value) > max)) {
            console.log("Mayor que el máximo")
            e.target.value = max + "";
            onChange(e);
            return;
        }

        onChange(e);
        return;
    }

    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label id={id + "-label"} htmlFor={id + "-input"} >{label}</label>
                </div>
                <div className="form-field form-number">
                    {disabled ?
                        <input id={id + "-input"} name={name} type="number" onChange={(e) => onChangeInput(e)} placeholder={placeholder} min={min ?? null} max={max ?? null} defaultValue={defaultValue ?? null} disabled={true} />
                        :
                        <input id={id + "-input"} name={name} type="number" onChange={(e) => onChangeInput(e)} placeholder={placeholder} min={min ?? null} max={max ?? null} defaultValue={defaultValue ?? null} />
                    }
                </div>
            </div>
        </>
    );
}

export default InputNumber