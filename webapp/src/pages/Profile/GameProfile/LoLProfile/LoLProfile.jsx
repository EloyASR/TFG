import React, { useEffect, useState } from 'react'
import "./LoLProfile.css"
import Header from "./Header/Header";
import Match from "./Match/Match";
import Queue from "./Ranked/Queue";
import lolinfoService from '../../../../services/lolinfoService';

const defaultData = {};

function LoLProfile({profileName}) {

    const [name, setName] = useState(profileName);
    const [data, setData] = useState(defaultData);

    useEffect(()=>{
        setName(profileName);
        handleClick();
    },[profileName])

    const handleClick = async e => {
        const datos = await lolinfoService.lolinfo({user:name})
        if(!datos){
            console.log("datos no encontrados")
        }else{
            console.log("datos encontrados")
            setData(datos)
            console.log(data)
        }
    }

    console.log(data);

    return <>
        <div className="lol-profile">
            <div className="header">
                <Header handleClick={handleClick} data={data}/>
            </div>
            <div className="body">
                <div className="left">
                    {
                        data.rankeds ? data.rankeds.map((ranked)=><Queue data={ranked}/>) : <Queue data={{}}/>
                    }                    
                </div>
                <div className="center">
                    {
                        data.games ? data.games.map((game)=><Match data={game} playerId={data.id}/>):<></>
                    }
                </div>
            </div>
        </div>
    </>;
}

export default LoLProfile