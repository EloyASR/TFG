import "./TableRow.css";
import TableChampion from "../Champion/TableChampion";
import TableDamage from "../Damage/TableDamage";
import TableFarm from "../Farm/TableFarm";
import TableItems from "../Items/TableItems";
import TableKda from "../Kda/TableKda";
import TableWards from "../Wards/TableWards";

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