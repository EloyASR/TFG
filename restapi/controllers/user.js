const User = require('../models/user');

const getUser = async (req,res) => {
    var user = await User.findById(req.params.userId)
    res.status(200)
    res.json(user);
}

module.exports = { getUser };