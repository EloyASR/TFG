import { useState, useEffect } from "react";

function TableKda({ data, teamTotalKills}) {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    let kdarate = 0;

    if(data.deaths === 0){
        kdarate = "Prefect(" + (data.kills+data.assists) + ")";
    }else{
        kdarate = Math.trunc((data.kills+data.assists)/data.deaths*100);
    }

    let killparticipation = Math.trunc((data.kills+data.assists)/teamTotalKills*100);
    
    return <>
        <td className="table-kda">
            <div className="k-d-a">
                <span className="k">{data.kills}</span>
                /
                <span className="d">{data.deaths}</span>
                /
                <span className="a">{data.assists}</span>
                {width >= 550 ? <>({killparticipation}%)</> : <></>}
            </div>
            <div className="rate">
                {kdarate/100}:1
            </div>
        </td>
    </>;
}

export default TableKda