//set up connection to mongoose
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localgost:3001/social-network",
    {
        userNewUrlParser: true,
        useUnifiesTopology: true,
    }
);

//use to log mongo queries
mongoose.set("debug", true);

//export to use elsewhere
module.exports = mongoose.connection;

