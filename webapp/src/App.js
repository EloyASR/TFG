import './App.css';

import NavBar from './components/NavBar/NavBar';
import InitPage from './components/Init/InitPage';
import TournamentPage from './components/Tournaments/TournamentsPage'
import LoginPage from './components/Login/LoginPage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import {Route} from "wouter";
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <div className="App">
      <body>
        <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
            <Col xs={12} sm={12} md={4} lg={3} xl={3} xxl={2} className={"px-md-2 px-0 sticky-top bg-dark"} >
              <NavBar />
            </Col>
            <Col xs={12} sm={12} md={8} lg={9} xl={9} xxl={10} className="fullsize overflow-x-hidden overflow-y-auto">
            <main>
            <Route path="/tournaments" component={TournamentPage}/>
            </main>
            <footer className="">

            </footer>
            </Col>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
