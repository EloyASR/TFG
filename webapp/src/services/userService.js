import axios from 'axios';

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

const userService = {
    getUser: async (userId) => {
        try {
            let url = baseurl + '/users/' + userId
            const { data } = await axios.get(url)
            return data
        } catch (error) {
            console.log("Error no se ha podido encontrar el usuario")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    },

    updateUser: async (userId, values) => {
        try {
            let url = baseurl + '/users/' + userId
            const { data } = await axios.put(url, values)
            return data
        } catch (error) {
            throw error;
        }
    }
}

export default userService