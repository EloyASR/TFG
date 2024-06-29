import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000'

let url = baseurl + '/api/users'

const signupService = {

    signup: async (values) => {
        try {
            const {data} = await axios.post(url, values)
            return data
        } catch (error) {
            throw error;
        }
    }
}

export default signupService