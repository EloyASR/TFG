import TableItemsItem from "./TableItemsItem";
import TableItemsWard from "./TableItemsWard";

function TableItems({data}) {
    return <>
        <td className="table-items">
            <div>
                <div>
                    <div>
                        <TableItemsItem item={data.item0} />
                        <TableItemsItem item={data.item1} />
                        <TableItemsItem item={data.item2} />
                    </div>
                    <div>
                        <TableItemsItem item={data.item3} />
                        <TableItemsItem item={data.item4} />
                        <TableItemsItem item={data.item5} />
                    </div>
                </div>
                <TableItemsWard item={data.item6} />
            </div>
        </td>
    </>;
}

export default TableItems