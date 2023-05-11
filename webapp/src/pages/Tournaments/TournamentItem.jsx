import iconoTorneo from "../../assets/multimedia/icono-torneo.jpg";
import { Link } from "wouter";
import moment from 'moment';

function TournamentItem({ tournamentData }) {

    var initDate = new Date(tournamentData.initDate);
    var endDate = new Date(tournamentData.endDate);

    return (
        <>
            <Link href={"/tournament/" + tournamentData.uid}>
                <div className="tournament" >
                    <div className="tournament-img">
                        <img src={iconoTorneo} alt="" />
                    </div>
                    <div className="tournament-info">
                        <div className="tournament-name">
                            {tournamentData.name}
                        </div>
                        <div className="tournament-data">
                            <div className="tournament-date tournament-info-element">
                                <div className="info-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" aria-hidden="true">
                                        <path d="M14 6v5.5a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 012 11.5V6h12zm-2.5-4A2.5 2.5 0 0114 4.5V5H2v-.5A2.5 2.5 0 014.5 2h7z"></path>
                                    </svg>
                                </div>
                                <div className="info-text">
                                    {
                                        moment(initDate).format('MMM Do, YYYY') + " - " +
                                        moment(endDate).format('MMM Do, YYYY') 
                                    }
                                </div>
                            </div>

                            <div className="tournament-limit tournament-info-element">
                                <div className="info-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" aria-hidden="true">
                                        <path d="M11.5 8c.83 0 1.5.67 1.5 1.5v.5c0 1.97-1.86 4-5 4-3.14 0-5-2.03-5-4v-.5C3 8.67 3.67 8 4.5 8h7zM8 1.5A2.75 2.75 0 118 7a2.75 2.75 0 010-5.5z"></path>
                                    </svg>
                                </div>
                                <div className="info-text">
                                    16 Participants
                                </div>
                            </div>
                            <div className="tournament-location tournament-info-element">
                                <div className="info-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" aria-hidden="true">
                                        <path d="M8 1a6 6 0 016 6c0 2.87-1.94 5.5-5.73 7.92a.5.5 0 01-.54 0C3.93 12.51 2 9.87 2 7a6 6 0 016-6zm0 4a2 2 0 100 4 2 2 0 000-4z"></path>
                                    </svg>
                                </div>
                                <div className="info-text">
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tournament-state">
                        <div className="state-text">
                            REGISTRATION OPEN
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default TournamentItem;