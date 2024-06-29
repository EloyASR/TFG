import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000'

let url = baseurl + '/api/login'

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