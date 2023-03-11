import TableItemsItem from "./TableItemsItem";
import TableItemsWard from "./TableItemsWard";

function TableItems(props){
    return <>
        <td className="table-items">
            <div>
                <TableItemsItem item={true}/>
                <TableItemsItem item={true}/>
                <TableItemsItem item={true}/>
                <TableItemsItem item={true}/>
                <TableItemsItem item={true}/>
                <TableItemsItem item={false}/>
                <TableItemsWard/>
            </div>
        </td>
    </>;
}

export default TableItems