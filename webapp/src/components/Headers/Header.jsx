import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './GameHeader.module.css';
import cx from 'classnames';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.title = props.title;
    }

    render() {
        return (
            <div className="layout-header">
                <Row className= {cx(styles["header"], styles["header-torneos"], styles["text-white"], styles["header-border"],"my-0")}>
                    <div className={cx(styles["header-center"], styles["header-gradient"], "p-md-5 p-4")}>
                        <div className={styles["header-title-container"]}>
                            <h1 className={styles["header-title-text"]}>{this.title}</h1>
                        </div>
                    </div>
                </Row>
            </div>
        );
    }
}

export default Header;