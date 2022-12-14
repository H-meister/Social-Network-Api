//import router
const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// GET route and POST route 
router.route('/')
.get(getUser)
.post(createUser);
//GET POST DELETE by id
router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);
//POST DELETE friend routes by id
router.route(':id/friends/:id')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;