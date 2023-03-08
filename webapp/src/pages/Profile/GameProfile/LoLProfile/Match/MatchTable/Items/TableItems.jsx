import "./TableItems.css";
import TableItemsItem from "./Item/TableItemsItem";
import TableItemsWard from "./Ward/TableItemsWard";

function TableItems(props){
    return <>
        <td className="table-items">
            <TableItemsItem item={true}/>
            <TableItemsItem item={true}/>
            <TableItemsItem item={true}/>
            <TableItemsItem item={true}/>
            <TableItemsItem item={true}/>
            <TableItemsItem item={false}/>
            <TableItemsWard/>
        </td>
    </>;
}

export default TableItems