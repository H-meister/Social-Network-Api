const { User, thought} = require ('../models');

//create conroller for routes
module.exports = {
    //Get all user
    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }
}