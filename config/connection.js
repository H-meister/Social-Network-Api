//set up connection to mongoose
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/socialnetwork_db',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

//export to use elsewhere
module.exports = mongoose.connection;

