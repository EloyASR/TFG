import React from 'react'
import NavBarItem from './NavBarItem'


import styles from './NavBar.module.css';

class NavBar extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <nav className={styles.Nav}>
                <NavBarItem href="/" text="Inicio" />
                <NavBarItem href="/tournaments" text="Torneos" />
                <NavBarItem href="/login" text="Login" />
                <NavBarItem href="/" text="Link4" />
                <NavBarItem href="/" text="Link5" />
            </nav>
        )
    }
}

export default NavBar