import './App.css';

import NavBar from './components/NavBar/NavBar';
import TournamentPage from './components/Tournaments/TournamentsPage'
import Col from 'react-bootstrap/Col';
import GamePage from './components/Tournaments/GamePage';


import {Route} from "wouter";

function App() {
  return (
    <div className="App">
        <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
            <Col xs={12} sm={12} md={4} lg={3} xl={3} xxl={2} className={"px-md-2 px-0 sticky-top bg-dark bordeNav"} >
              <NavBar />
            </Col>
            <Col xs={12} sm={12} md={8} lg={9} xl={9} xxl={10} className="overflow-x-hidden overflow-y-auto h-100 p-0">
            <main>
            <Route path="/tournaments" component={TournamentPage}/>
            <Route path="/tournaments/:game" component={GamePage}/>
            </main>
            </Col>
          </div>
        </div>
    </div>
  );
}

export default App;
