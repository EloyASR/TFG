import { useEffect, useState } from "react";

function InputRadio({ label, itemsList, id, name, checked, onChange }) {


    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label for="">{label}</label>
                </div>
                <div className="form-field inline-layout">
                    <div className="form-container">
                        {
                            itemsList?.map((item, index) =>
                                <>
                                    <div className="form-row">
                                        <div className="form-field own-form-radio">
                                            {
                                                checked === item ? 
                                                    <input id={id + "-" + index} name={name} type="radio" value={item} defaultChecked onChange={(e)=>onChange(e.target.value)}/>
                                                    :
                                                    <input id={id + "-" + index} name={name} type="radio" value={item} onChange={(e)=>onChange(e.target.value)}/>
                                            }
                                            <label>{item}</label>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputRadio