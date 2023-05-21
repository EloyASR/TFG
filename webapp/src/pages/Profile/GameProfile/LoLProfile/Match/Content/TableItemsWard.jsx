import defaultIcon from '../../../../../../assets/multimedia/icon_01.png';

function TableItemsWard({item}) {
    return <>
        <div className="table-items-ward">
            {item !== 0 ?
                <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/" + item + ".png"} alt="Rune icon" />
                : <></>
            }
        </div>
    </>
}

export default TableItemsWard