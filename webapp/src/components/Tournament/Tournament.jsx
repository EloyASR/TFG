import React from "react";
import Container from "react-bootstrap/esm/Container";

class Tournament extends React.Component{
    constructor(props){
        super(props);

        this.icon = props.icon;
        this.game = props.game;
        this.name = props.name;
        this.capacity = props.capacity;
        this.maxcapacity = props.maxcapacity;
        this.initdate = this.initdate;
        this.enddate = this.enddate;
    }

    render(){
        return(
            <Container>


            </Container>
        )
    }
}

export default Tournament;