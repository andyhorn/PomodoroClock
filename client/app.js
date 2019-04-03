const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

app.use(helmet({
    frameguard: {
      action: 'deny'
    },
    hidePoweredBy: {},
    hsts: {
      maxAge: 90 * 24 * 60 * 60 * 1000,
      force: true
    },
    ieNoOpen: {},
    noSniff: {},
    xssFilter: {}
}));

require('dotenv').config();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
});