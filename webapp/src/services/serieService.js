import axios from 'axios';

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000'

const serieService = {
    getSerie: async (serieId) => {
        try {
            let url = baseurl + '/api/series/' + serieId
            const { data } = await axios.get(url)
            return data
        } catch (error) {
            return {code: 400, msg: "Error al buscar la serie"}
        }
    },

    createSerie: async (values) => {
        try {
            let url = baseurl + '/api/series';
            const {data} = await axios.post(url, values)
            return {code: 200, msg: "Serie creada con éxito", data:data}
        } catch (error) {
            return {code: 400, msg: "Error al crear la serie"}
        }
    },

    updateSerie: async (serieId, values) => {
        try {
            let url = baseurl + '/api/series/' + serieId
            await axios.put(url, values)
            return {code: 200, msg: "Serie actualizada con éxito"}
        } catch (error) {
            return {code: 400, msg: "Error al actualizar la serie"}
        }
    }
}

export default serieService;