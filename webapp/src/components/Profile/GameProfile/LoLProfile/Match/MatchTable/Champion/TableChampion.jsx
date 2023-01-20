import TableIcon from "./Icon/TableIcon";
import TableRunes from "./Runes/TableRunes";
import TableSpells from "./Spells/TableSpells";
import TableSummoner from "./Summoner/TableSummoner";

import "./TableChampion.css";

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