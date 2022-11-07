import React from 'react'
import NavBarItem from './NavBarItem'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

class NavBar extends React.Component{

    render(){
        return (
            <div className="d-flex flex-md-column flex-row flex-grow-1 align-items-center align-items-md-start pt-2 text-white mb-sm-auto ">
                <ul className="nav nav-pills flex-md-column flex-row flex-nowrap flex-shrink-1 flex-md-grow-0 flex-grow-1 mb-sm-auto mb-sm-auto justify-content-around align-items-md-start ">
                    <NavBarItem href={"/"} text={"INICIO"} icon={faHouse}/>
                    <NavBarItem href={"/tournaments"} text={"TORNEOS"} icon={faTrophy}/>
                    <NavBarItem href={"/calendario"} text={"CALENDARIO"} icon={faCalendarDays}/>
                    <NavBarItem href={"/profile"} text={"PROFILE"} icon={faUserAlt}/>
                </ul>
            </div>
        )
    }
}

export default NavBar