import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MenuOptionSimple({ option, length, selected, setSelected }) {
    return (
        <>
            <div className={selected ? "selected menu-option size-1-" + length : "menu-option size-1-" + length}>
                <button onClick={() => {
                    option.onClick()
                    setSelected()
                }}>
                    <div>
                        {option.name}
                    </div>
                    <FontAwesomeIcon icon={option.icon} size="sm" rotation={option.iconRotation}/>
                </button>
            </div>
        </>
    );
}

export default MenuOptionSimple;