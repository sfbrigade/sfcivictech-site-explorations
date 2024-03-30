require('dotenv').config();
const express = require('express');
const {getRepos} = require('./functions.js');

const port = process.env.PORT || 3000;

const app = express();


app.get('/api', async (req, res) => {
    const repos = await getRepos(); // from functions.js
    res.send(repos);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});