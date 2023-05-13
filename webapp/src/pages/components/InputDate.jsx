import { useEffect, useState } from "react";

function InputDate({ min, max, label, onChange, disabled, dateAndTime }) {

    const [dateTime, setDateTime] = useState({});

    useEffect(()=>{
        setDateTime(dateAndTime);
    },[dateAndTime]);

    const setDate = (date)=>{
        var dateTimeCopia = {
            date: date,
            time: dateTime.time
        }

        onChange(dateTimeCopia);
    }

    const setTime = (time)=>{
        var dateTimeCopia = {
            date: dateTime.date,
            time: time
        }

        onChange(dateTimeCopia);
    }

    console.log(dateTime);

    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label>{label}</label>
                </div>
                <div className="form-field form-number">
                    <div className="flex nowrap spacing-medium">
                        <div className="size-4-5">
                            <input type="date" onChange={(e)=>setDate(e.target.value)} defaultValue={dateTime?dateTime.date:undefined} disabled={disabled}/>
                        </div>
                        <div className="size-1-5">
                            <input type="time" onChange={(e)=>setTime(e.target.value)} defaultValue={dateTime?dateTime.time:undefined} disabled={disabled}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputDate