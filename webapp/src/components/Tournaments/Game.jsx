import React from 'react'


import styles from './Tournaments.module.css';

import lol from '../../assets/img/lol.png';

import cx from 'classnames';

import {Link} from "wouter";

class Game extends React.Component{

    constructor(props){
        super(props)
        this.game = props.game;
        this.src = props.src ?? lol;
    }

    render(){
        return(
            <div className= {cx(styles.BotonJuego, styles[this.game])}>
                <Link to={"/tournaments/" + this.game} >
                    <img className={styles.ImagenJuego} src={this.src}/>
                </Link>
            </div>
        )        
    }


}

export default Game