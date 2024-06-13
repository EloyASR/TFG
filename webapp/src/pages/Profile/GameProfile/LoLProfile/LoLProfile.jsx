import React, { useEffect, useState } from 'react'
import "./LoLProfile.css"
import Header from "./Header/Header";
import Match from "./Match/Match";
import Queue from "./Ranked/Queue";
import leagueOfLegendsService from "../../../../services/leagueOfLegendsService";

const defaultData = {};

function LoLProfile({name, tag, puuid, summonerId}) {

    const [profileData, setProfileData] = useState(defaultData);
    const [gamesData, setGamesData] = useState(defaultData);
    const [runesData, setRunesData] = useState(undefined);

    useEffect(()=>{
        getData()
    },[puuid])

    const getData = async e => {
        await getProfileData();
        await getGamesData();
        await getRunesData();
    }

    const getProfileData = async e => {
        const datos = await leagueOfLegendsService.getProfileData(puuid, summonerId)
        if(!datos){
            console.log("datos no encontrados")
        }else{
            console.log("datos encontrados")
            setProfileData(datos)
        }
    }

    const getGamesData = async e => {
        const datos = await leagueOfLegendsService.getGamesData(puuid)
        if(!datos){
            console.log("datos no encontrados")
        }else{
            console.log("datos encontrados")
            datos.summonerId = summonerId;
            setGamesData(datos)
        }
    }

    const getRunesData = async e => {
        const datos = await leagueOfLegendsService.getRunesData()
        if(!datos){
            console.log("datos no encontrados")
        }else{
            console.log("datos encontrados")
            setRunesData(datos)
        }
    }

    return <>
        <div className="flex lol-profile gap-medium">
            <div className="size-1-1 header">
                <Header handleClick={getProfileData} data={profileData} name={name} tag={tag}/>
            </div>
            <div className="flex vertical gap-medium size-all">
                <div className="flex horizontal spacing-medium">
                    {
                        profileData.rankeds ? profileData.rankeds.map((ranked)=><div className={"size-1-2"}><Queue data={ranked}/></div>) : <div className={"size-1-2"}><Queue data={{}}/></div>
                    }                    
                </div>
                <div className="flex vertical gap-medium size-1-1">
                    {
                        gamesData.games ? gamesData.games.map((game) => <Match data={game} playerId={gamesData.summonerId} runesData={runesData}/>) : <></>
                    }
                </div>
            </div>
        </div>
    </>;
}

export default LoLProfile