import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GameHeader from '../Headers/GameHeader';


import Game from './Game';


import styles from './Tournaments.module.css';

import lolicon from '../../assets/img/lolicon1.png';
import valicon from '../../assets/img/valicon2.png';


class GamePage extends React.Component{

    constructor(props){
        super(props)
        this.game=props.params.game;
    }

    render(){

        var header
        
        if(this.game=='leagueoflegends'){
            header = <GameHeader title= {"League of Legends"} game= {"lol"} icon={lolicon}/>;
        }else if(this.game=='valorant'){
            header = <GameHeader title= {"Valorant"} game= {"val"} icon={valicon}/>
        }else{
            header = <GameHeader title= {"Default"} game= {"normal"}/>
        }
        
        return(
            <Container fluid className="d-flex align-items-start justify-content-center flex-row flex-wrap p-0">
                {header}
                <Col xs={12} className="pt-3">
                    
                </Col>
            </Container>
        )
    }
}

export default GamePage;