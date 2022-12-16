const router = require('express').Router();
//get everthign from the conroller
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// GET and POST thoughts
router.route('/')
.get(getThought)
.post(createThought);

//GET and PUT and DELETE routes for thoughts and reactions
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//POST reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

//DELETE reactions
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;