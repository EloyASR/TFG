import React from 'react'
import {Link} from "wouter";

import styles from './NavBar.module.css';

class NavBarItem extends React.Component{

    constructor(props){
        super(props)
        this.href=props.href
        this.text=props.text
    }

    render(){
        return (
            <Link className={styles.NavItem} to={this.href}> {this.text} </Link>
        )
    }
}

export default NavBarItem