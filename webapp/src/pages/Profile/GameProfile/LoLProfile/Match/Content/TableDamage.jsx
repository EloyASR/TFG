function TableDamage({data, teamTopDmg}) {
    /* IMPORTANTE: CAMBIAR PROGRESS POR UN ELEMENTO PROGRESS DE HTML */

    let percentage = Math.trunc(data.totalDamageDealtToChampions/teamTopDmg*100);

    return <>
        <td className="table-damage">
            <div className="damage">
                <div className="dealt">{data.totalDamageDealtToChampions}</div>
                <div className="progress">
                    <div className="fill" style={{width: percentage + "%"}}></div>
                </div>
            </div>
        </td>
    </>;
}

export default TableDamage