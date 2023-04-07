import TableIcon from "./TableIcon";
import TableRunes from "./TableRunes";
import TableSpells from "./TableSpells";
import TableSummoner from "./TableSummoner";

function TableChampion({data}) {
    console.log(data);
    return <>
        <td colSpan="4" className="table-champion">
            <div>
                <TableIcon data={data}/>
                <TableSpells data={data}/>
                <TableRunes data={data}/>
                <TableSummoner data={data}/>
            </div>
        </td>
    </>
}

export default TableChampion