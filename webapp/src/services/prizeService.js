import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

const prizeService = {

    getPrizesByCreator: async (creator,page) => {
        try {
            let url = baseurl + '/prizes?creator=' + creator + '&page=' + page;
            const {data} = await axios.get(url);
            return data;

        } catch (error) {
        }
    },

    getPrize: async (id) => {
        try {
            let url = baseurl + '/prizes/' + id;
            const {data} = await axios.get(url);
            return data;
        } catch (error) {
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