//import router
const router = require('express').Router();
//conenct index api routes
const apiRoutes = require('./api');
//use /api for all api routes
router.use('/api', apiRoutes);
//if wrong route used send message
router.use((req,res) => res.send('Wrong route!'));
//export
module.exports = router;