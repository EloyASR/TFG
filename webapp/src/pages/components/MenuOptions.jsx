import MenuOptionSimple from "./MenuOptionSimple";
import MenuOptionDisplay from "./MenuOptionDisplay";
import { Fragment } from "react";

function MenuOptions({ options }) {


    /**
     * Formato que debe tener options
     * 
     * Lista de objetos option cada item tendra los siguientes atributos
     * 
     * - type: simple | display
     * - name
     * - onClick: solo si es simple
     * 
     * Si es display tendra una lista de objetos option
     * - options: lo mismo que antes (lista de objetos)
     * 
     */

    console.log(options);

    return (
        <>
            <div className="flex spacing-medium">
                {
                    options.map((item, index) => {
                        if (item.type === "simple") {
                            return (
                                <Fragment key={index}>
                                    <div className={"size-1-" + options.length}>
                                        <MenuOptionSimple option={item} />
                                    </div>
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