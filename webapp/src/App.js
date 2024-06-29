import './App.css';

import React from 'react';
import {useParams } from "react-router-dom"
import { Routes, Route,Navigate } from "react-router"
import LoginSignup from './pages/LoginSignup/LoginSignup';
import Profile from './pages/Profile/Profile';
import Nav from './pages/Nav/Nav';
import {useState } from 'react';
import TournamentsList from './pages/Tournament/List/TournamentsList';
import TournamentCreationPage from './pages/Tournament/Creation/TournamentCreationPage';
import TournamentDetails from './pages/Tournament/Details/TournamentDetails';
import EditProfile from './pages/Profile/EditProfile/EditProfile';
import PrizeCreation from './pages/Prizes/PrizeCreation';
import PrizeList from "./pages/Prizes/PrizeList";
import PrizeEdit from "./pages/Prizes/PrizeEdit";
import TournamentInformation from "./pages/Tournament/Details/Info/TournamentInformation";
import TournamentParticipants from "./pages/Tournament/Details/Participants/TournamentParticipants";
import TournamentPhases from "./pages/Tournament/Details/Phases/TournamentPhases";
import SponsorTournament from "./pages/Tournament/Details/Info/SponsorTournament";
import TournamentEdit from "./pages/Tournament/Edit/TournamentEdit";
import {faGithub, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TournamentSponsors from "./pages/Tournament/Details/Sponsors/TournamentSponsors";

function App() {

  const [tab, setTab] = useState(0);

  const ProtectedRoute = ({children}) => {
    
    const props = useParams();

    if (!localStorage.getItem("session")) {
      return <Navigate to="/login" replace />;
    }

    if(props){
      return React.cloneElement(children, props);
    }else{
      return children;
    }
  };

  const AdminRoute = ({children}) => {
    const props = useParams();

    if (!localStorage.getItem("user")) {
      return <Navigate to="/login" replace />;
    }else {
      if(JSON.parse(localStorage.getItem("user")).role === "ADMIN") {
        if(props){
          return React.cloneElement(children, props);
        }else{
          return children;
        }
      }else {
        return <Navigate to="/profile" replace />;
      }
    }
  }

  const CompanyAndAdminRoute = ({children}) => {
    const props = useParams();

    if (!localStorage.getItem("user")) {
      return <Navigate to="/login" replace />;
    }else {
      if(JSON.parse(localStorage.getItem("user")).role === "ADMIN" || JSON.parse(localStorage.getItem("user")).role === "COMPANY") {
        if(props){
          return React.cloneElement(children, props);
        }else{
          return children;
        }
      }else {
        return <Navigate to="/profile" replace />;
      }
    }
  }

  const CompanyRoute = ({children}) => {
    const props = useParams();

    if (!localStorage.getItem("user")) {
      return <Navigate to="/login" replace />;
    }else {
      if (JSON.parse(localStorage.getItem("user")).role === "COMPANY") {
        if (props) {
          return React.cloneElement(children, props);
        } else {
          return children;
        }
      } else {
        return <Navigate to="/profile" replace />;
      }
    }
  }

  return (

      <div className="flex vertical gap-medium App">
        <div className="nav">
          <Nav tab={tab} setTab={(tabId) => setTab(tabId)} />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route index element={<Navigate to="/profile" replace />} />
          <Route path="/login" element={<LoginSignup selected={"login"} />} />
          <Route path="/signup" element={<LoginSignup selected={"signup"} />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          } />
          <Route path="/profile/edit" element={
            <ProtectedRoute>
              <EditProfile/>
            </ProtectedRoute>
          } />
          <Route path="/user/:userId" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>
          <Route path="/prizes" element={
            <ProtectedRoute>
              <CompanyAndAdminRoute>
                <PrizeList/>
              </CompanyAndAdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/prize/create" element={
            <ProtectedRoute>
              <CompanyAndAdminRoute>
                <PrizeCreation/>
              </CompanyAndAdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/prize/edit/:prizeId" element={
            <ProtectedRoute>
              <CompanyAndAdminRoute>
                <PrizeEdit/>
              </CompanyAndAdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/tournament/create" element={
            <ProtectedRoute>
              <AdminRoute>
                <TournamentCreationPage/>
              </AdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/tournament/:tournamentId/edit" element={
            <ProtectedRoute>
              <AdminRoute>
                <TournamentEdit/>
              </AdminRoute>
            </ProtectedRoute>
          }/>
          <Route path="/tournament/:tournamentId" element={
            <ProtectedRoute>
              <TournamentDetails/>
            </ProtectedRoute>
          }>
              <Route path="info" element={<TournamentInformation />} />
              <Route path="participants" element={<TournamentParticipants />} />
              <Route path="phases" element={<TournamentPhases />} />
              <Route path="sponsors" element={
                <AdminRoute>
                  <TournamentSponsors />
                </AdminRoute>
              } />
              <Route index element={<Navigate to="info" replace />} />
          </Route>
          <Route path="/tournaments" element={
            <ProtectedRoute>
              <TournamentsList/>
            </ProtectedRoute>
          } />
          <Route path="/my-tournaments" element={
            <ProtectedRoute>
              <AdminRoute>
                <TournamentsList ownTournaments={true}/>
              </AdminRoute>
            </ProtectedRoute>
          } />
          <Route path="/sponsored-tournaments" element={
            <ProtectedRoute>
              <CompanyRoute>
                <TournamentsList sponsoredTournaments={true}/>
              </CompanyRoute>
            </ProtectedRoute>
          } />
          <Route path="/sponsor/:tournamentId" element={
            <ProtectedRoute>
              <CompanyRoute>
                <SponsorTournament/>
              </CompanyRoute>
            </ProtectedRoute>
          } />
        </Routes>
        <div className="footer flex align-center">
          <div className="contenidos flex horizontal">
            <div className="bloque flex vertical gap-large">
              <h5>SOBRE NOSOTROS</h5>
              <a>Política de Privacidad</a>
              <a>Política de Cookies</a>
            </div>
            <div className="bloque flex vertical gap-large">
              <h5>OTRA INFORMACIÓN</h5>
              <a>Ayuda</a>
            </div>
            <div className="bloque flex vertical gap-large">
              <h5>REDES SOCIALES</h5>
              <div className="flex horizontal spacing-large">
                <a><FontAwesomeIcon icon={faGithub} size={'xl'}/></a>
                <a><FontAwesomeIcon icon={faLinkedin} size={'xl'}/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
