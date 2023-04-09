import './App.css';
import { Route } from "wouter";

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Nav from './pages/Nav/Nav';
import { useState } from 'react';

function App() {

  const [tab, setTab] = useState(0);


  console.log(tab);

  return (
    <div className="App">

      <div className="nav">
        <Nav tab={tab} setTab={(tabId)=>setTab(tabId)}/>
      </div>
      <div className="main">
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
