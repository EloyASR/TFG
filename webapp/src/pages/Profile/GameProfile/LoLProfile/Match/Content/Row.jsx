import TableChampion from "./TableChampion";
import TableDamage from "./TableDamage";
import TableFarm from "./TableFarm";
import TableItems from "./TableItems";
import TableKda from "./TableKda";
import TableWards from "./TableWards";
import { useState, useEffect } from "react";

function Row({data, teamTopDmg, teamTotalKills, gameDuration, runesData}){

    const [width, setWidth] = useState(window.innerWidth);

    console.log(teamTopDmg);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return <>
        <tr>
            <TableChampion data={data} runesData={runesData}/>
            <TableKda data={data} teamTotalKills={teamTotalKills}/>
            {
                width >= 550?<TableDamage data={data} teamTopDmg={teamTopDmg}/>:<></>
            }
            {
                width >= 650?<TableWards data={data}/>:<></>
            }
            {
                width >= 390?<TableFarm data={data} gameDuration={gameDuration}/>:<></>
            }
            <TableItems data={data}/>
        </tr>
    </>;
}

export default Row