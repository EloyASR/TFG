import TableIcon from "./TableIcon";
import TableRunes from "./TableRunes";
import TableSpells from "./TableSpells";
import TableSummoner from "./TableSummoner";

function TableChampion({data, runesData}) {
    return <>
        <td colSpan="4" className="table-champion">
            <div>
                <TableIcon data={data}/>
                <TableSpells data={data}/>
                <TableRunes data={data} runesData={runesData}/>
                <TableSummoner data={data}/>
            </div>
        </td>
    </>
}

export default TableChampion