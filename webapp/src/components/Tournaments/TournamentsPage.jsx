import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Game from './Game';


import styles from './Tournaments.module.css';

import lol from '../../assets/img/lol.png';
import val from '../../assets/img/valorant.png';
import lol1300 from '../../assets/img/lol-1300-350.png';
import val1300 from '../../assets/img/val-1300-350.png';
import cr from '../../assets/img/clashroyale.png';


class TournamentsPage extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container fluid className="d-flex align-items-start justify-content-center flex-row">
                <div className="flex-row">
                    <Col><Game src1={lol} src2={lol1300} game={'leagueoflegends'}/></Col>
                    <Col><Game src1={val} src2={val1300} game={'valorant'}/></Col>
                </div>
            </Container>
        )
    }
}

export default TournamentsPage