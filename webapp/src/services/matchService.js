import axios from 'axios';

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000'

const matchService = {
    getMatch: async (matchId) => {
        try {
            let url = baseurl + '/api/matches/' + matchId
            const { data } = await axios.get(url)
            return data
        } catch (error) {
            return {code: 400, msg: "Error al buscar el partido"}
        }
    },

    createMatch: async (values) => {
        try {
            let url = baseurl + '/api/matches';
            const {data} = await axios.post(url, values)
            return {code: 200, msg: "Partido creado con éxito", data:data}
        } catch (error) {
            return {code: 400, msg: "Error al crear el partido"}
        }
    },

    updateMatch: async (matchId, values) => {
        try {
            let url = baseurl + '/api/matches/' + matchId
            await axios.put(url, values);
            return {code: 200, msg: "Serie actualizada con éxito"}
        } catch (error) {
            return {code: 400, msg: "Error al actualizar el partido"}
        }
    }
}

export default matchService;