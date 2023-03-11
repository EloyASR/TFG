import defaultIcon from '../../../../assets/multimedia/icon_01.png';

function TableIcon(props) {
    return <>
        <div className="table-icon">
            <img src={defaultIcon} alt="Icono Campeon" />
            <div className="lvl">
                <p>00</p>
            </div>
        </div>
    </>
}

export default TableIcon