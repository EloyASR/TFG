import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'



function Combobox({ itemsList, label, name, placeholder, onChange, id, selection, required, error}) {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        setSelected(selection);
    }, [selection]);


    const handleSelectItem = (item) => {
        setSelected(item)
        setExpanded(false);
        onChange(item);
    }

    return (
        <>
            <div className="form-row">
                {
                    label ?
                        <div className="form-label">
                            <label id={id + "-label"} htmlFor={id + "-combobox"}>{label}</label>
                        </div>
                        :
                        <></>
                }
                <div className="form-field own-form-select-onlyread">
                    <div className="select-widget-header">
                        <div className="flex no-wrap">
                            {required ? <input
                                id={id + "-combobox"}
                                type="text"
                                name={name}
                                defaultValue={selected}
                                placeholder={placeholder}
                                required={required}
                                onKeyDown={(e)=>e.preventDefault()} />
                                :
                                <input
                                    id={id + "-combobox"}
                                    type="text"
                                    name={name}
                                    defaultValue={selected}
                                    placeholder={placeholder}
                                    onKeyDown={(e)=>e.preventDefault()} />
                            }
                            <button className="widget-button" id={name + "-combobox-button"} type="button" title="size" aria-label="open combobox" aria-disabled="false" onClick={() => setExpanded(!expanded)}>
                                {expanded ?
                                    <FontAwesomeIcon icon={faCaretUp} style={{ color: "#000000" }} />
                                    :
                                    <FontAwesomeIcon icon={faCaretDown} style={{ color: "#000000" }} />}
                            </button>
                        </div>
                    </div>
                    {
                        expanded ?
                            <>
                                <div className="select-widget-container">
                                    <div className="select-widget">
                                        <div className="select-list" id="listbox">
                                            {itemsList.map((item, index) =>
                                                <div key={index}
                                                    role="option"
                                                    id={id + "-combobox-option-" + index}
                                                    data-rw-option=""
                                                    data-rw-focusable=""
                                                    tabIndex="-1"
                                                    aria-selected="false"
                                                    className="widget-list-option"
                                                    onClick={() => handleSelectItem(item)}>
                                                    {item}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                            </>
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

export default Combobox;