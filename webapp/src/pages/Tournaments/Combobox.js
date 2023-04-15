import { useState } from "react";



function Combobox({itemsList}) {

    const itemsWithIndex = []

    for(let i=0; i<itemsList.length;  i++){
        itemsWithIndex.push({key:i,item:itemsList[i]})
    }

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(0);

    const handleSelectItem = (item)=>{
        setSelected(item.key)
        setExpanded(false);
    }

    return (
        <>
            <div className="widget">
                <div className="widget-selector">
                    <input className="widget-input" 
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
                        value={itemsWithIndex[selected].item}>
                    </input>
                    <button className="widget-button" type="button" title="Nombre de tooltip" aria-label="open combobox" aria-disabled="false" onClick={()=>setExpanded(!expanded)}>
                        {expanded?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="16px" height="16px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny">
                            <path d="M18.2 13.3l-6.2-6.3-6.2 6.3c-.2.2-.3.5-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7z"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="16px" height="16px"viewBox="0 0 24 24" version="1.2" baseProfile="tiny">
                            <path d="M5.8 9.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7s.1.5.3.7z" />
                        </svg>}
                    </button>
                </div>
                <div className={expanded ? "widget-popup-container" : "widget-popup-container-none"}>
                    <div className="widget-popup">
                        <div className="widget-list" id="listbox">
                            {itemsWithIndex.map((item)=>
                                <div key={item.key} 
                                    role="option" 
                                    data-rw-option="" 
                                    data-rw-focusable="" 
                                    tabIndex="-1" 
                                    aria-selected="false" 
                                    className="widget-list-option" 
                                    onClick={()=>handleSelectItem(item)}>
                                    {item.item}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Combobox;