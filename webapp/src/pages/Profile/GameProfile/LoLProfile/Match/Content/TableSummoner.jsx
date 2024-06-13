function TableSummoner({data}) {
    return <>
        <div className="table-summoner">
            <div className="nick">{data.riotIdGameName}</div>
            <div className="tier">LvL. {data.summonerLevel}</div>
        </div>
    </>;
}

export default TableSummoner