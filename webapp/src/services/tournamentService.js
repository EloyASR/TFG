import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'



const tournamentsService = {

    getAllTournaments: async () => {
        try {
            let url = baseurl + '/search/tournaments'
            
            const {data} = await axios.get(url)
            console.log(data);

            return data
        } catch (error) {
            console.log("Error al recuperar los torneos")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    getTournament: async (tournamentId) => {
        try {
            console.log(tournamentId)
            let url = baseurl + '/tournament/' + tournamentId
            
            const {data} = await axios.get(url)
            console.log(data);

            return data
        } catch (error) {
            console.log("Error no se ha podido encontrar el torneo")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    createTournament: async (tournamentData) => {
        try{
            
            console.log(tournamentData)
            let url = baseurl + '/tournament/create' 
            
            const {data} = await axios.post(url, tournamentData)

            console.log(data)

            return data;

        }catch(error){
            console.log("No se ha podido crear el torneo")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    }
}

export default tournamentsService