import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

const prizeService = {

    getPrizesByCreator: async (creator,page) => {
        console.log(page)
        try {
            let url = baseurl + '/prizes?creator=' + creator + '&page=' + page;

            console.log(url);
            const {data} = await axios.get(url);
            console.log(data);
            return data;

        } catch (error) {
            console.log("Error al recuperar los premios")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    getPrize: async (id) => {
        try {
            let url = baseurl + '/prizes/' + id;
            const {data} = await axios.get(url);
            return data;
        } catch (error) {
            console.log("Error al recuperar el premio")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    createPrize: async (values) => {
        try {
            let url = baseurl + '/prizes';
            const {data} = await axios.post(url, values)
            return data
        } catch (error) {
            throw error;
        }
    },

    updatePrize: async (id, values) => {
        try {
            let url = baseurl + '/prizes/' + id;
            const {data} = await axios.put(url, values)
            return data;
        } catch (error) {
            throw error;
        }
    },

    deletePrize: async (id) => {
        try {
            let url = baseurl + '/prizes/' + id;
            const {data} = await axios.delete(url)
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default prizeService