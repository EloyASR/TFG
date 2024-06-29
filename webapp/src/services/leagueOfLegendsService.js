import axios from 'axios'

const baseurl = process.env.REACT_APP_API_URI || 'http://localhost:5000'

const leagueOfLegendsService = {

    getAccountData: async (userid, tagline) => {
        try{

            let url = baseurl + '/leagueoflegends/info/account';

            let {data} = await axios.post(url,{
                userid,
                tagline
            });
            return data;
        }catch(e){
        }
    },

    getProfileData: async (puuid, summonerId) => {
        try{

            let url = baseurl + '/leagueoflegends/info/profile';

            let {data} = await axios.post(url,{
                puuid,
                summonerId
            });
            return data;
        }catch(e){
        }
    },

    getGamesData: async (puuid) => {
        try{

            let url = baseurl + '/leagueoflegends/info/games';

            let {data} = await axios.post(url,{
                puuid
            });
            return data;
        }catch(e){
        }
    },

    getGameData: async (gameId) => {
        try{

            let url = baseurl + '/leagueoflegends/info/game';

            let {data} = await axios.post(url,{
                gameId
            });
            return data;
        }catch(e){
        }
    },

    getRunesData: async () => {
        try{
            let url = "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/runesReforged.json";

            let {data} = await axios.get(url);

            return data;
        }catch(e){
        }
    }


}

export default leagueOfLegendsService