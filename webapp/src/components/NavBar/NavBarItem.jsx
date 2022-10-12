import React from 'react'
import {Link} from "wouter";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import styles from './NavBar.module.css';

class NavBarItem extends React.Component{

    constructor(props){
        super(props)
        this.href=props.href
        this.text=props.text
        this.icon=props.icon
    }

    render(){
        return (
            <li className="nav-item mx-2 p-3">
                <Link to={this.href}>
                    <a className="nav-link align-middle px-0" >
                    <FontAwesomeIcon className="fs-4" icon={this.icon}/>
                    <span className="ms-3 d-none d-md-inline">{this.text} </span>
                    </a>
                </Link>
            </li>
        )
    }
}

export default NavBarItem