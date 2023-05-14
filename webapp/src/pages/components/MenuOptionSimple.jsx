function MenuOptionSimple({option}){
    return(
        <>
            <button onClick={option.onClick}>{option.name}</button>
        </>
    );
}

export default MenuOptionSimple;