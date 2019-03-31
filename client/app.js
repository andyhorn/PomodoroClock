const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
});