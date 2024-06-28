import {Fragment, useEffect, useState} from "react";

function InputRadio({ label, itemsList, id, name, checked, onChange, disabled}) {

    const [checkedRadio, setCheckedRadio] = useState("");

    useEffect(() => {
        setCheckedRadio(checked)
    },[checked])

    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label>{label}</label>
                </div>
                <div className="form-field inline-layout">
                    <div className="form-container">
                        {
                            itemsList?.map((item, index) =>
                                <Fragment key={index}>
                                    <div className="form-row">
                                        <div className="form-field own-form-radio">
                                            {
                                                checkedRadio === item ?
                                                    <input id={id + "-" + index} name={name} type="radio" value={item} defaultChecked={true} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
                                                    :
                                                    <input id={id + "-" + index} name={name} type="radio" value={item} onChange={(e) => onChange(e.target.value)} disabled={disabled}/>
                                            }
                                            <label>{item}</label>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputRadio