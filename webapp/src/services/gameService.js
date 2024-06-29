import axios from 'axios';

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000'

const gameService = {

    getGames: async () => {
        try {
            let url = baseurl + '/api/games'

            const {data} = await axios.get(url);
            return data;
        } catch (error) {
            return {code: 400, msg: "Error al recuperar los juegos"}
        }
    },

    getGame: async (id) => {
        try {
            let url = baseurl + '/api/games/' + id;
            const {data} = await axios.get(url);
            return data;
        } catch (error) {
            return {code: 400, msg:"Error al recuperar el juego"}
        }
    },
}

export default gameService;