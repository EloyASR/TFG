function TableItemsWard({item}) {
    return <>
        <div className="table-items-ward">
            {item !== 0 ?
                <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/" + item + ".png"} alt="Rune icon" />
                : <></>
            }
        </div>
    </>
}

export default TableItemsWard