import React, { useState } from 'react'
import "./LoLProfile.css"
import LoLHeader from "./LoLHeader";
import LoLMatch from "./LoLMatch";
import LoLQueue from "./LoLQueue";
import lolinfoService from '../../../../services/lolinfoService';

const defaultName ="EloyASR";
const defaultData = {};

function LoLProfile(props) {

    const [name, setName] = useState(defaultName);
    const [data, setData] = useState(defaultData)

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
                <LoLHeader handleClick={handleClick} data={data}/>
            </div>
            <div className="body">
                <div className="left">
                    {
                        data.rankeds ? data.rankeds.map((ranked)=><LoLQueue data={ranked}/>) : <LoLQueue data={{}}/>
                    }                    
                </div>
                <div className="center">
                    {
                        data.games ? data.games.map((game)=><LoLMatch data={game} playerId={data.id}/>):<></>
                    }
                </div>
            </div>
        </div>
    </>;
}

export default LoLProfile