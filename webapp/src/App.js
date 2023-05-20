import './App.css';

import React from 'react';
import { Routes, Route, Navigate, useParams } from "react-router-dom"

import LoginSignup from './pages/LoginSignup/LoginSignup';
import Profile from './pages/Profile/Profile';
import Nav from './pages/Nav/Nav';
import { Component, useEffect, useState } from 'react';
import TournamentsPage from './pages/Tournaments/TournamentsPage';
import TournamentCreationPage from './pages/TournamentCreation/TournamentCreationPage';
import TournamentView from './pages/TournamentView/TournamentView';
import { relativeTimeRounding } from 'moment';

function App() {

  const [tab, setTab] = useState(0);

  const ProtectedRoute = ({children}) => {
    
    const props = useParams();

    if (!localStorage.getItem("session")) {
      return <Navigate to="/login" replace />;
    }

    console.log(props);
    if(props){
      return React.cloneElement(children, props);
    }else{
      return children;
    }

    
  };


  return (
    <div className="App">
      <div className="nav">
        <Nav tab={tab} setTab={(tabId) => setTab(tabId)} />
      </div>
      <Routes>
        <Route path="/" element={<></>} />
        <Route index element={<></>} />
        <Route path="/login" element={<LoginSignup selected={"login"} />} />
        <Route path="signup" element={<LoginSignup selected={"signup"} />} />
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
        <Route path="tournament/create" element={
          <ProtectedRoute>
            <TournamentCreationPage/>
          </ProtectedRoute>
        } />
        <Route path="tournament/:tournamentId" element={
          <ProtectedRoute>
            <TournamentView/>
          </ProtectedRoute>
        } />
        <Route path="tournaments" element={
          <ProtectedRoute>
            <TournamentsPage/>
          </ProtectedRoute>
        } />
      </Routes>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
