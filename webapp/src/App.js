import './App.css';
import { Route } from "wouter";

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Nav from './pages/Nav/Nav';
import { useState, useEffect } from 'react';
import TournamentsPage from './pages/Tournaments/TournamentsPage';
import TournamentPage from './pages/Tournaments/TournamentPage';
import cacheImages from './helpers/preloadImgs';

function App() {

  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{


    const imgs = [
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Aatrox.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Ahri.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Akali.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Akshan.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Alistar.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Amumu.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Anivia.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Annie.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Aphelios.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Ashe.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/AurelionSol.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Azir.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Bard.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Belveth.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Blitzcrank.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Brand.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Braum.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Caitlyn.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Camille.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Cassiopeia.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Chogath.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Corki.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Darius.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Diana.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Draven.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/DrMundo.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Ekko.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Elise.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Fiddlesticks.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Fiora.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Fizz.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Galio.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Gangplank.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Garen.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Gnar.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Gragas.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Graves.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Gwen.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Hecarim.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Heimerdinger.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Illaoi.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Irelia.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Ivern.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Janna.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/JarvanIV.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Jax.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Jayce.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Jhin.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Jinx.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kaisa.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kalista.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Karma.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Karthus.png"
    ]

    const imgs2 = [
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kassadin.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Katarina.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kayle.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kayn.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kennen.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Khazix.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kindred.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Kled.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/KogMaw.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/KSante.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Leblanc.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/LeeSin.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Leona.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Lillia.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Lissandra.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Lucian.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Lulu.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Lux.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Malphite.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Malzahar.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Maokai.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/MasterYi.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Milio.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/MissFortune.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/MonkeyKing.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Mordekaiser.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Morgana.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nami.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nasus.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nautilus.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Neeko.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nidalee.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nilah.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nocturne.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Nunu.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Olaf.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Orianna.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Ornn.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Pantheon.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Poppy.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Pyke.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Qiyana.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Quinn.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Rakan.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Rammus.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/RekSai.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Rell.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Renata.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Renekton.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Rengar.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Riven.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Rumble.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Ryze.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Samira.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Sejuani.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Senna.png",
      "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Seraphine.png"
    ]

    cacheImages(imgs);
    cacheImages(imgs2);
  },[])

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
        <Route path="/tournament/:tournamentId" component={TournamentPage} />
        <Route path="/tournaments" component={TournamentsPage} />
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
