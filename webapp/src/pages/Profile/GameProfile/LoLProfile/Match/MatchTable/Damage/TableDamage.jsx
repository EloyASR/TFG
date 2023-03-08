import "./TableDamage.css"

function TableDamage({percentage}) {
    /* IMPORTANTE: CAMBIAR PROGRESS POR UN ELEMENTO PROGRESS DE HTML */

    return <>
        <td className="table-damage">
            <div className="damage">
                <div className="dealt">100,000</div>
                <div className="progress">
                    <div className="fill" style={{width: {percentage}}}></div>
                </div>
            </div>
        </td>
    </>;
}

export default TableDamage