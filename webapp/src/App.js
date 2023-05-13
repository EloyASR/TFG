import './App.css';
import { Route, Switch} from "wouter";

import LoginSignup from './pages/LoginSignup/LoginSignup';
import Profile from './pages/Profile/Profile';
import Nav from './pages/Nav/Nav';
import { useState } from 'react';
import TournamentsPage from './pages/Tournaments/TournamentsPage';
import TournamentCreationPage from './pages/TournamentCreation/TournamentCreationPage';
import TournamentView from './pages/TournamentView/TournamentView';

function App() {

  const [tab, setTab] = useState(0);

  return (
    <div className="App">

      <div className="nav">
        <Nav tab={tab} setTab={(tabId) => setTab(tabId)} />
      </div>
      <div className="main">
        <Route path="/login" ><LoginSignup selected={"login"} /></Route>
        <Route path="/signup" ><LoginSignup selected={"signup"} /></Route>
        <Route path="/profile" component={Profile} />
        <Switch>
          <Route path="/tournament/create" component={TournamentCreationPage} />
          <Route path="/tournament/:tournamentId" component={TournamentView} />
        </Switch>

        <Route path="/tournaments" component={TournamentsPage} />
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
