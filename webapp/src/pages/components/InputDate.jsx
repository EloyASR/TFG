import { useEffect, useState } from "react";

function InputDate({ min, max, label, onChange, disabled, dateAndTime}) {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [dateMin, setDateMin] = useState('');
    const [dateMax, setDateMax] = useState('');
    const [timeMin, setTimeMin] = useState('');
    const [timeMax, setTimeMax] = useState('');

    useEffect(()=>{
        setDatos();
    },[dateAndTime, min, max, time, date])

    const setDatos = ()=>{

        let horas = dateAndTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).split(':')[0];
        setDate(dateAndTime.toLocaleDateString('en-CA'))
        setTime(`${horas}:00`);

        if (min) {

            setDateMin(min.toLocaleDateString('en-CA'))

            if (dateAndTime.toLocaleDateString('en-CA') === min.toLocaleDateString('en-CA')) {

                let horasMin = min.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }).split(':')[0];

                setTimeMin(`${horasMin}:00`);

            } else {
                setTimeMin(null);
                setTime(`${horas}:00`);
            }
        }
        if (max) {
            setDateMax(max.toLocaleDateString('en-CA'))

            if (dateAndTime.toLocaleDateString('en-CA') === max.toLocaleDateString('en-CA')) {

                let horasMax = max.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }).split(':')[0];

                setTimeMax(`${horasMax}:00`);

            } else {
                setTimeMax(null);
                setTime(`${horas}:00`);
            }
        }
    }

    const setFecha = (fecha) => {

        const nuevaFecha = fecha.target.value;

        let fechaConvertida = new Date(nuevaFecha + "T" + time);

        if(fechaConvertida < min) {
            fecha.target.value = min.toLocaleDateString('en-CA')
            setDate(min.toLocaleDateString('en-CA'))
            onChange(min)
        }else if(fechaConvertida > max) {
            fecha.target.value = max.toLocaleDateString('en-CA')
            setDate(max.toLocaleDateString('en-CA'))
            onChange(max)
        }else {
            fecha.target.value = nuevaFecha;
            setDate(nuevaFecha);
            onChange(fechaConvertida);
        }
    }

    const setHora = (hora) => {
        let horas = hora.target.value.split(':')[0];

        let fechaConvertida = new Date(date + `T${horas}:00`);

        if(fechaConvertida < min){
            console.log("HoraMenor")
            let horasMin = min.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).split(':')[0];
            hora.target.value = `${horasMin}:00`;
            setTime(`${horasMin}:00`);
            onChange(min)
        }else if (fechaConvertida > max){
            console.log("HoraMayor")
            let [horasMax] = max.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).split(':')[0];
            hora.target.value = `${horasMax}:00`;
            setTime(`${horasMax}:00`);
            onChange(max)
        } else {
            console.log("HoraIgual")
            hora.target.value = `${horas}:00`;
            setTime(`${horas}:00`);
            onChange(fechaConvertida)
        }
    }

    const onDateChange = (fecha) => {
        const nuevaFecha = fecha.target.value;
        console.log(nuevaFecha);
        let fechaConvertida = new Date(nuevaFecha + "T" + time);
        fecha.target.value = nuevaFecha;
        setDate(nuevaFecha);
        onChange(fechaConvertida);
    }

    return (
        <>
            <div className="form-row">
                <div className="form-label">
                    <label>{label}</label>
                </div>
                <div className="form-field form-number">
                    <div className="flex nowrap spacing-medium">
                        <div className="size-4-5">
                            <input
                                type="date"
                                onBlur={(e)=>setFecha(e)}
                                onChange={(e)=>onDateChange(e)}
                                value={date}
                                defaultValue={date}
                                disabled={disabled}
                                min={dateMin}
                                max={dateMax}/>
                        </div>
                        <div className="size-1-5">
                            <input
                                type="time"
                                step="3600"
                                onChange={(e)=>setHora(e)}
                                defaultValue={time}
                                value={time}
                                disabled={disabled}
                                min={timeMin}
                                max={timeMax}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputDate