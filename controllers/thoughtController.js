const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getThought(req, res) {
        Thought.find({})
        .then((data) => res.json(data))
        .catch((err) = res.status(500).json(err));
    },
    // get a single thought 
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then((data) => {
            if (data) {
                res.json(data);
            }
            res.status(404).json({ message: "No thought found"})
        })
        .catch((err) => res.status(500).json(err));
    },
    //create a thought and associate user
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: _id }},
                { new: true} 
            );
        })
        .then((data) => {
            if(data) {
                res.json(data);
            }
            res.status(404).json({ message: "No User with this id "})
        })
        .catch((err) => res.status(500).json(err));
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            {
                runValidators: true, 
                new: true
            }
        )
        .then((data) => {
            if(data) {
                res.json(data);
            }
            res.status(404).json({ message: "no thought found"})
        })
        .catch((err) => res.status(500).json(err));
    },
    //deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            if(data){
                res.json(data)
            }
            res.status(404).json({ message: "Could not find thought to delete"})
        })
        .catch((err) => res.status(500).json(err));
    },
    //create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            {
                runValidators:true,
                new: true
            }
        )
        .then((data) => {
            if(data) {
                res.json(data)
            }
            res.status(404).json({ message: "No thought found "});
        })
        .catch((err) => res.status(500).json(err));
    },
    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            {
                runValidators:true,
                new:true
            }
        )
        .then((data) => {
            if(data) {
                res.json(data)
            }
            res.status(404).json({ message: " no thought found "});
        })
        .catch((err) => res.status(500).json(err));
    }
};
