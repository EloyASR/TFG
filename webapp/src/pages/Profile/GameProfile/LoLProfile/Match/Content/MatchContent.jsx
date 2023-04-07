function Table({data}) {

    return (
        <>
            <div className="match-extended">
                <div className="equipo-azul">
                    <Table data={data} />
                </div>
                <div className="equipo-rojo">
                    <Table data={data} />
                </div>
            </div>
        </>
    );
}