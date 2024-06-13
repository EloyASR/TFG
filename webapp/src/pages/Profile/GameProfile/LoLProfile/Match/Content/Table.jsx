import { useState, useEffect } from "react";
import Row from "./Row"

function Table({ data, gameDuration, runesData}) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    var dmgs = data.map(element => element.totalDamageDealtToChampions)
    var teamTopDmg = dmgs.reduce((accumulator,currentValue)=>accumulator <= currentValue ? currentValue : accumulator,0);
    var teamTotalKills = data.map(element => element.kills).reduce((acumulator, currentValue) => acumulator + currentValue, 0);

    console.log(dmgs);
    console.log(teamTopDmg);

    return <>
        <table>
            <colgroup>
                <col width="5.95%" />
                <col width="2.43%" />
                <col width="2.43%" />
                <col width="auto" />
                <col width="15.08%" />
                {
                    width >= 550 ? <col width="14.06%" /> : <></>
                }
                {
                    width >= 650 ? <col width="8.74%" /> : <></>
                }
                {
                    width >= 390 ? <col width="11%" /> : <></>
                }
                <col width="25.85%" />
            </colgroup>
            <thead>
                <tr>
                    <th colSpan="4">
                        <span className="result">Victoria</span>(Equipo Azul)
                    </th>
                    <th>KDA</th>
                    {
                        width >= 550 ? <th>Daño</th> : <></>
                    }
                    {
                        width >= 650 ? <th>Wards</th> : <></>
                    }
                    {
                        width >= 390 ? <th>Súbditos</th> : <></>
                    }
                    <th>Objetos</th>
                </tr>
            </thead>
            <tbody>
                {data[0].individualPosition === "Invalid" ?
                    <>
                        {data.map(element =>
                            <Row data={element}
                                teamTopDmg={teamTopDmg}
                                teamTotalKills={teamTotalKills}
                                gameDuration={gameDuration}
                            />)
                        }
                    </>
                    :
                    <>
                        <Row data={data.find(participant => participant.teamPosition === "TOP")} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data.find(participant => participant.teamPosition === "JUNGLE")} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data.find(participant => participant.teamPosition === "MIDDLE")} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data.find(participant => participant.teamPosition === "BOTTOM")} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data.find(participant => participant.teamPosition === "UTILITY")} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                    </>
                }
            </tbody>
        </table>
    </>;
}

export default Table