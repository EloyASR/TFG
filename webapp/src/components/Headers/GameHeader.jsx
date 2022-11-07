import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './GameHeader.module.css';
import cx from 'classnames';

class GameHeader extends React.Component {

    constructor(props) {
        super(props);
        this.title = props.title;
        this.game = props.game;
        this.icon = props.icon;
    }

    render() {

        return (
            <Col xs={12}>
                <Row className= {cx(styles["header"], styles["header-" + this.game], styles["text-white"], styles["header-border"],"my-0")}>
                    <div className={cx(styles["header-center"], styles["header-gradient"], "p-md-5 p-4")}>
                        <div className={styles["header-title-container"]}>
                            <img src={this.icon} alt={"img"} className={cx("d-none", "d-md-inline", styles["header-title-img"])}/>
                            <h1 className={styles["header-title-text"]}>{this.title}</h1>
                        </div>
                    </div>
                </Row>
            </Col>
        );
    }
}

export default GameHeader;