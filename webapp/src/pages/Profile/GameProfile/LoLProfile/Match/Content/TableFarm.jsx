import { useState, useEffect } from "react";

function TableFarm({data, gameDuration}) {

    const [width, setWidth] = useState(window.innerWidth);

    var creepsMin = Math.trunc((data.totalMinionsKilled+data.neutralMinionsKilled)/(gameDuration/60)*100)/100

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return <>
        <td className="table-farm">
            <div>{data.totalMinionsKilled+data.neutralMinionsKilled} CS</div>
            {width >= 500?<div>({creepsMin}/min)</div>:<></>}
        </td>
    </>
}

export default TableFarm