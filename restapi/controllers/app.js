const isUp = async (req,res) => {
    res.status(200);
    return res.send("API is UP");
}

module.exports = {isUp}