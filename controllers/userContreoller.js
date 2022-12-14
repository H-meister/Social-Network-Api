const { User, thought } = require('../models');

//create conroller for routes
module.exports = {
    //Get all user
    getUser(req, res) {
        User.find({})
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    //get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "no user found with this id"});
                    return;
                }
                res.json(data);
            })
            .catch((err) => res.status(500).json(err));
    },
    //create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    //update a user
    updateUser(req, res) {
        User.findOneAndsUpdate({ _id: req.params.id }, body, {
            new: true,
            runvalidators: true
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'no user found with this id' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    //deleting a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    },
    //add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.id } },
            {
                runValidators: true,
                new: true
            })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "no user found with this id "});
                    return;
                }
                res.json(data);
            })
            .catch((err) => res.json(err));
    },
    //delete a friend
    deleteFriend(req, res) {
        User.dinfOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.id }},
            { new: true }
        )
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: "no user found with this id" });
            }
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
    }
}
