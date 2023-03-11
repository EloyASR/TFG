import TableRow from "./TableRow"

function MatchTable(props) {
    return <>
        <table>
            <colgroup>
                <col width="5.95%" />
                <col width="2.43%" />
                <col width="2.43%" />
                <col />
                <col width="15.08%" />
                <col width="14.06%" />
                <col width="8.74%" />
                <col width="11%" />
                <col width="25.85%" />
            </colgroup>
            <thead>
                <tr>
                    <th colSpan="4">
                        <span className="result">Victoria</span>(Equipo Azul)
                    </th>
                    <th>KDA</th>
                    <th>Daño</th>
                    <th>Wards</th>
                    <th>Súbditos</th>
                    <th>Objetos</th>
                </tr>
            </thead>
            <tbody>
                <TableRow />
                <TableRow />
                <TableRow />
                <TableRow />
                <TableRow />
            </tbody>
        </table>
    </>;
}

export default MatchTable