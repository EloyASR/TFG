import MenuOptionSimple from "./MenuOptionSimple";
import MenuOptionDisplay from "./MenuOptionDisplay";
import { Fragment, useState } from "react";

function MenuOptions({ options }) {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(0);

    return (
        <>
            <div className="flex menu-options">
                {
                    options.map((item, index) => {
                        if (item.type === "simple") {
                            return (
                                <Fragment key={index}>
                                    <MenuOptionSimple option={item} length={options.length} selected={opcionSeleccionada === index} setSelected={()=>setOpcionSeleccionada(index)}/>
                                </Fragment>
                            );
                        } else {
                            return <MenuOptionDisplay options={item} />
                        }
                    })
                }
            </div>
        </>
    );
}

export default MenuOptions;