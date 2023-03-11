import defaultIcon from '../../../../assets/multimedia/icon_01.png';

function TableItemsItem({ item }) {
    if (item) {
        return <>
            <div className="table-items-item">
                <img src={defaultIcon} alt="Icono Item" />
            </div>
        </>
    } else {
        return <>
            <div className="table-items-item">
                <div className="no-item"></div>
            </div>
        </>
    }

}

export default TableItemsItem