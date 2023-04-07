function TableWards({data}) {
    return <>
        <td className="table-wards">
            <div>{data.visionWardsBoughtInGame}/{data.wardsPlaced}/{data.wardsKilled}</div>
            <div>{data.visionScore} v.s.</div>
        </td>
    </>;
}

export default TableWards