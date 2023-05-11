function InputDate({ min, max, label, onChange, defaultValue }) {
    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label>{label}</label>
                </div>
                <div className="form-field form-number">
                    <div className="flex nowrap spacing-medium">
                        <div className="size-4-5">
                            <input type="date" />
                        </div>
                        <div className="size-1-5">
                            <input type="time" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputDate