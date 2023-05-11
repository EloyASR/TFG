import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'



function Combobox({ itemsList, label, placeholder, onChange, id, selection }) {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        setSelected(selection);
    }, [selection]);


    const handleSelectItem = (item) => {
        setSelected(item)
        setExpanded(false);
        onChange(item);
        console.log(item);
    }

    return (
        <>
            <div className="form-row">
                {
                    label ?
                        <div className="form-label">
                            <label id={id + "-label"} for={id + "-combobox"}>{label}</label>
                        </div>
                        :
                        <></>
                }
                <div className="form-field own-form-select-onlyread">
                    <div className="select-widget-header">
                        <div className="flex no-wrap">
                            <input
                                id={id + "-combobox"}
                                role="combobox"
                                aria-busy="false"
                                aria-owns="listbox"
                                aria-autocomplete="list"
                                aria-expanded="false"
                                aria-haspopup="true" type="text"
                                tabIndex="0"
                                autoComplete="off"
                                aria-disabled="false"
                                aria-controls=""
                                readOnly
                                defaultValue={selected}
                                placeholder={placeholder} />
                            <button className="widget-button" type="button" title="Nombre de tooltip" aria-label="open combobox" aria-disabled="false" onClick={() => setExpanded(!expanded)}>
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
            </div>
        </>
    );
}

export default Combobox;