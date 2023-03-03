import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const url = 'http://localhost:8080/api/login'

const loginService = {

    login: async (values) => {
        try {
            console.log(values)
            console.log(url)
            const {data} = await axios.post(url, values)
            console.log(data)
            return data
        } catch (error) {
            console.log(error.response.status)
            console.log(error.response.data)
        }
    }
}

export default loginService