import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

const userService = {
    getUser: async (userId) => {
        try {
            let url = baseurl + '/user/' + userId
            const { data } = await axios.get(url)
            console.log(data);
            return data
        } catch (error) {
            console.log("Error no se ha podido encontrar el usuario")
            console.log(error.response.status)
            console.log(error.response.data)
        }
    }
}

export default userService