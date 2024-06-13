import {useOutletContext} from "react-router";

function TournamentCalendar(){

    const {phases} = useOutletContext();

    var hardcodeSeries = [
        {
            _id: "65e0f577fc13ae063acd367e",
            type: "5VS5",
            mode: "TOURNAMENT",
            bestOf: 1,
            game: "65df8098fc13ae2387cd3c60", //LEAGUE OF LEGENDS
            home_participant: "65df8098fc13ae2387cd3c65", //TEAM 1
            away_participant: "65df8098fc13ae2387cd3c66", //TEAM 2
            date: new Date("2024-02-01T20:00:00.000+00:00"),
            result: {
                winner: "65df8098fc13ae2387cd3c66", //TEAM 1
                loser: "65df8098fc13ae2387cd3c65", //TEAM 2
                winner_result:1,
                loser_result:0,
                matches: [
                    "65df8098fc13ae2387cd3c63" //MATCH 2
                ]
            },
            status: "FINISHED"
        },
        {

        }
    ]


    return(
        <>
            <div className="card">
                <div className="card-header">
                    Calendario
                </div>
                <div className="card-content flex vertical gap-large">
                    {
                        hardcodeSeries.map((series, key ) => {
                            return <>
                                <div className="flex align-around align-middle serie-visualizer p-3">
                                    <p> Participante 1 </p>
                                    <img></img>
                                    <p>0 - 0</p>
                                    <img></img>
                                    <p> Participante 2 </p>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default TournamentCalendar;