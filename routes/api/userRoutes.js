//import router
const router = require('express').Router();

const {getUser} = require('../../controllers/userContreoller');

// GET routes 
router.route('/').get(getUser);

module.exports = router;