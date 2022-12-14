import React from 'react';
import Row from 'react-bootstrap/Row';


import Game from './Game';


import lol from '../../assets/img/lol.png';
import val from '../../assets/img/valorant.png';
import lol1300 from '../../assets/img/lol-1300-350.png';
import val1300 from '../../assets/img/val-1300-350.png';

import Header from '../Headers/Header';


class TournamentsPage extends React.Component {

    render() {
        return (
            <div>
                <Header title="Torneos"/>
                <div className="layout-content">
                    <section className="layout-block content">
                        <div className="grid-flex vertical spacing-huge">
                            <div className="size-content">
                                <Row className="justify-content-center m-0">
                                    <Game src1={lol} src2={lol1300} titulo={'League of Legends'} game={'leagueoflegends'} />
                                    <Game src1={val} src2={val1300} titulo={'Valorant'} game={'valorant'} />
                                </Row>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default TournamentsPage