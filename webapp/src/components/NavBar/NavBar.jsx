import React from 'react'
import NavBarItem from './NavBarItem'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Navbar from 'react-bootstrap/Navbar';
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import styles from './NavBar.module.css';

class NavBar extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="d-flex flex-md-column flex-row flex-grow-1 align-items-center align-items-md-start px-3 pt-2 text-white mb-sm-auto">
                <ul className="nav nav-pills flex-md-column flex-row flex-nowrap flex-shrink-1 flex-md-grow-0 flex-grow-1 mb-sm-auto mb-sm-auto justify-content-around align-items-md-start ">
                    <NavBarItem href={"/"} text={"INICIO"} icon={faHouse}/>
                    <NavBarItem href={"/tournaments"} text={"TORNEOS"} icon={faTrophy}/>
                    <NavBarItem href={"/calendario"} text={"CALENDARIO"} icon={faCalendarDays}/>
                    <NavBarItem href={"/profile"} text={"PROFILE"} icon={faUserLarge}/>
                </ul>
            </div>
        )
    }
}

export default NavBar