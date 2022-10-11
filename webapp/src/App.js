import './App.css';

import NavBar from './components/NavBar/NavBar';
import InitPage from './components/Init/InitPage';
import TournamentPage from './components/Tournaments/TournamentsPage'
import LoginPage from './components/Login/LoginPage';


import {Route} from "wouter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          TFG
        </h1>
      </header>
      <main>
      
        <NavBar />

        <section>
          <Route path="/" component={InitPage}/>
          <Route path="/tournaments" component={TournamentPage}/>
          <Route path="/login" component={LoginPage}/>
        </section>
        
        
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
