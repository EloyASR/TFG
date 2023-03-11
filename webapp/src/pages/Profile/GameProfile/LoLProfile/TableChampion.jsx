import TableIcon from "./TableIcon";
import TableRunes from "./TableRunes";
import TableSpells from "./TableSpells";
import TableSummoner from "./TableSummoner";

function TableChampion(props) {
    return <>
        <td colspan="4" className="table-champion">
            <div>
                <TableIcon/>
                <TableSpells/>
                <TableRunes/>
                <TableSummoner/>
            </div>
        </td>
    </>
}

export default TableChampion