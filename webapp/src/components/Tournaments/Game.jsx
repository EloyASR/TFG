import React from 'react'


import styles from './Tournaments.module.css';
import Col from 'react-bootstrap/Col';

import lol from '../../assets/img/lol.png';
import lol1300 from '../../assets/img/lol-1300-350.png';

import cx from 'classnames';

import { Link } from "wouter";

class Game extends React.Component {

    constructor(props) {
        super(props)
        this.game = props.game;
        this.titulo = props.titulo;
        this.src1 = props.src1 ?? lol;
        this.src2 = props.src2 ?? lol1300;
    }

    render() {
        return (
            <Col xs={12} md={12} lg={9} >
                <Link to={"/tournaments/" + this.game} >
                    <div className={cx(styles.BotonJuego, styles[this.game])}>
                        <picture className={styles.pictureNormal}>
                            <img className={cx(styles.ImagenJuegoNormal, styles.ImagenJuegomd)} src={this.src2} />
                        </picture>
                        <div className={styles.divTit}>{this.titulo}</div>
                    </div>
                </Link>
            </Col>
        )
    }
}

export default Game