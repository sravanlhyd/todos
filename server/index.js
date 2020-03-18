const express = require('express');
const morgan = require('morgan');
require('./db/db');

//PORT assign
const PORT = process.env.PORT || 3000;
const message = `Server is running on PORT:${PORT}.`;

//Init app
const app = express();

//Middleware
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
    next();
});

//Setting routes
app.use(require('./routes/assignment'));
// app.use(require('./routes/delete'));

app.get('/test', (req, res) => res.send(message));

app.all('*', (req, res) => res.send(`Access denied`));

//System Listen
app.listen(PORT, () => console.log(`${message}`))
