import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Game from './Game';


import styles from './Tournaments.module.css';

import lol from '../../assets/img/lol.png';
import val from '../../assets/img/valorant.png';
import cr from '../../assets/img/clashroyale.png';


class TournamentsPage extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container clasName={styles.ContenedorJuegos} fluid='true'>
                <Row md='auto' className="justify-content-md-center">
                    <Col><Game src={lol} game={'leagueoflegends'}/></Col>
                    <Col><Game src={val}game={'valorant'}/></Col>
                    <Col><Game src={cr} game={'clashroyale'}/></Col>
                </Row>
            </Container>
        )
    }
}

export default TournamentsPage