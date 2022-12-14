//require express and db and routes to use
const express = require('express');
const db = require('./config/connection')
const routes = require('./routes');
//set ports
const PORT = process.env.PORT || 3001;
const app = express();
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
//setting up port
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});