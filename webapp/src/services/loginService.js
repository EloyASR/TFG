import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

let url = baseurl + '/login'

const loginService = {

    login: async (values) => {

        try {
            const {data} = await axios.post(url, values);
            return data
        } catch (error) {
        }
    }
}

export default loginService