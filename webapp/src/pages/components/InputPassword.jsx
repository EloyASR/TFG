import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function InputPassword({ label, onChange, name, placeholder, id, defaultValue, error }) {

    const [visibility, setVisibility] = useState(false);

    const changeVisibility = () => {
        setVisibility(!visibility);
    }

    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label id={id + "-label"} htmlFor={id + "-input"}> {label} </label>
                </div>
                <div className="form-field own-form-password">
                    <div className="flex no-wrap">
                        <input id={id + "-input"} type={visibility ? "text" : "password"} name={name} onChange={(e) => onChange(e)} placeholder={placeholder} defaultValue={defaultValue} />
                        <button type="button" onClick={(e) => {
                            e.preventDefault();
                            changeVisibility();
                        }}>
                            {
                                visibility ?
                                    <FontAwesomeIcon icon={faEyeSlash} style={{ color: "black" }}></FontAwesomeIcon>
                                    :
                                    <FontAwesomeIcon icon={faEye} style={{ color: "black" }}></FontAwesomeIcon>
                            }

                        </button>
                    </div>
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

export default InputPassword