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

    let dmgs = data.map(element => element.totalDamageDealtToChampions)
    let teamTopDmg = dmgs.reduce((accumulator,currentValue)=>accumulator <= currentValue ? currentValue : accumulator,0);
    let teamTotalKills = data.map(element => element.kills).reduce((acumulator, currentValue) => acumulator + currentValue, 0);

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
                        <span className="result">{data[0].win ? <>Victoria</> : <>Derrota</> } {data[0].teamId === 100 ? <>(Equipo Azul)</> : <>(Equipo Rojo)</> }</span>
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
                        <Row data={data[0]} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data[1]} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data[2]} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data[3]} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                        <Row data={data[4]} runesData={runesData} teamTopDmg={teamTopDmg} teamTotalKills={teamTotalKills} gameDuration={gameDuration} />
                    </>
                }
            </tbody>
        </table>
    </>;
}

export default Table