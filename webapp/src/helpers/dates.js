const getDateTomorrow = () => {
    let date = new Date();

    date.setDate(date.getDate() + 1);

    date.setHours(0,0,0,0);

    return date;
}

const getDatePlusOneDay = (date) => {
    date.setDate(date.getDate() + 1);

    date.setHours(0,0,0,0);

    return date;
}

const getMax = (fecha) => {
    let nuevaFecha = fecha;
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() - 1);
    return nuevaFecha;
}

const getMin = (fecha) => {
    let nuevaFecha = fecha;
    return nuevaFecha;
}


module.exports = {getDateTomorrow, getDatePlusOneDay, getMax, getMin}