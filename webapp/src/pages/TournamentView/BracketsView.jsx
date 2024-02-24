import { Fragment, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TournamentsService from "../../services/tournamentService";
import UserService from "../../services/userService";
import MatchModifier from "./MatchModifier";

function BracketsView({ bracketPhase }) {

    const [roundsData, setRoundsData] = useState([]);

    useEffect(() => {
        getRoundsData();
    }, []);

    const getRoundsData = async function () {
        var newRounds = []
        for (var round of bracketPhase.bracketData.rounds) {
            var newRound = {
                roundNumber: round.roundNumber,
                series: []
            }
            for (var serieId of round.series) {

                var serie = await TournamentsService.getSerie(serieId);

                var newSerie = {
                    uid: serie.uid,
                    participant1: serie.participant1,
                    participant2: serie.participant2,
                    matches: serie.matches
                }

                if (serie.participant1 !== undefined) {
                    newSerie.participant1Name = await getName(serie.participant1);
                }

                if (serie.participant2) {
                    newSerie.participant2Name = await getName(serie.participant2);
                }

                newRound.series.push(newSerie);

            }
            newRounds.push(newRound);
        }

        setRoundsData(newRounds);
    }

    console.log(roundsData);

    const getName = async (id) => {
        var usuario = await UserService.getUser(id);
        return usuario.name;
    }

    const calculateWidthDisplay = function (rounds) {
        return rounds * 300;
    }

    return (
        <>
            <div className="flex overflow-hidden size-1-1">
                <div className="inline-block scrollbar overflow-y-scroll overflow-x-auto size-1-1 bracket">
                    <div className={"flex width-" + calculateWidthDisplay(roundsData.length) + " brackets-rounds-menu"}>
                        {
                            roundsData.map((round, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className={"flex align-center bracket-rounds-menuitem size-1-" + roundsData.length}>
                                            <div className="flex align-center">
                                                ROUND {round.roundNumber}
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })
                        }
                    </div>
                    <div className={"flex width-" + calculateWidthDisplay(roundsData.length) + " brackets-rounds-body"}>
                        {
                            roundsData.map((round, roundIndex) => {
                                return (
                                    <Fragment key={roundIndex}>
                                        <div className={"size-1-" + roundsData.length}>
                                            <div className="flex vertical align-around brackets-rounds-column">
                                                {
                                                    round.series.map((serie, serieIndex) => {
                                                        return (
                                                            <Fragment key={serieIndex}>
                                                                <div className="flex vertical brackets-rounds-match">
                                                                    <div className="flex align-spread brackets-rounds-match-team">
                                                                        <div>
                                                                            {
                                                                                serie.participant1 ? serie.participant1Name : "TBD"
                                                                            }
                                                                        </div>
                                                                        <div className="brackets-rounds-match-team-result">
                                                                            0
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex align-spread brackets-rounds-match-team">
                                                                        <div>
                                                                            TBD
                                                                        </div>
                                                                        <div className="brackets-rounds-match-team-result">
                                                                            0
                                                                        </div>
                                                                    </div>
                                                                    <button className="brackets-rounds-match-modify" onClick={()=>{}}>
                                                                        <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                                                                    </button>
                                                                    <MatchModifier />
                                                                </div>
                                                            </Fragment>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default BracketsView;