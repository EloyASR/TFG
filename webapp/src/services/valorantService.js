import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000/'

const valorantService = {

    getAccountData: async (userid, tagline) => {
        try{

            let url = baseurl + 'valorant/info/account';

            let {data} = await axios.post(url,{
                userid,
                tagline
            });
            return data;
        }catch(e){
        }
    }


}

export default valorantService