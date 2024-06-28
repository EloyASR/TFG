const fetch = require('node-fetch');

const APIKEY = process.env.RIOT_APIKEY;
const RIOT_ACCOUNT_QUERY = process.env.RIOT_ACCOUNT_QUERY;

const findAccountData = async (req, res) => {

    let userid = encodeURIComponent(req.body.userid);
    let tag = encodeURIComponent(req.body.tagline);

    try{
        let result01 = await fetch(RIOT_ACCOUNT_QUERY + userid + "/" + tag + "?api_key=" + APIKEY);
        let accountData = await result01.json();

        let dataToSend = {
            puuid: accountData.puuid,
            gameName: accountData.gameName,
            tagLine: accountData.tagLine,
        }

        res.status(200);
        return res.send(dataToSend);
    }catch(e){
        res.status(400);
        return res.send({msg:"Error al encontrar info de la cuenta"});
    }
}

module.exports = {findAccountData}