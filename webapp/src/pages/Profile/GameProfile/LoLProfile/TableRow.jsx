import TableChampion from "./TableChampion";
import TableDamage from "./TableDamage";
import TableFarm from "./TableFarm";
import TableItems from "./TableItems";
import TableKda from "./TableKda";
import TableWards from "./TableWards";

function TableRow(props){
    return <>
        <tr>
            <TableChampion/>
            <TableKda/>
            <TableDamage/>
            <TableWards/>
            <TableFarm/>
            <TableItems/>
        </tr>
    </>;
}

export default TableRow