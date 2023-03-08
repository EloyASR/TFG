import './App.css';
import {Route} from "wouter";

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/profile" component={Profile}/>
    </div>
  );
}

export default App;
