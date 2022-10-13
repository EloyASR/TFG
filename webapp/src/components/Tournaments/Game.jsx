import React from 'react'


import styles from './Tournaments.module.css';

import lol from '../../assets/img/lol.png';
import lol1300 from '../../assets/img/lol-1300-350.png';

import cx from 'classnames';

import {Link} from "wouter";

class Game extends React.Component{

    constructor(props){
        super(props)
        this.game = props.game;
        this.src1 = props.src1 ?? lol;
        this.src2 = props.src2 ?? lol1300;
    }

    render(){
        return(
            <div className= {cx(styles.BotonJuego, styles[this.game])}>
                <Link to={"/tournaments/" + this.game} >
                    <picture>
                        <source media="(min-width:1000px)" srcset={this.src2}/>
                        <img className={cx(styles.ImagenJuegoNormal,styles.ImagenJuegomd)} src={this.src1}/>
                    </picture>
                </Link>
            </div>
        )        
    }


}

export default Game