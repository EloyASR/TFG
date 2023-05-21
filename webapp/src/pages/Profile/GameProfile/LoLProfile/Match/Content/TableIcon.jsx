import defaultIcon from '../../../../../../assets/multimedia/icon_01.png';

function TableIcon({data}) {
    return <>
        <div className="table-icon">
            <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/"+ data.championName+".png"} alt="Icono Campeon" />
            <div className="lvl">
                <p>{data.champLevel}</p>
            </div>
        </div>
    </>
}

export default TableIcon