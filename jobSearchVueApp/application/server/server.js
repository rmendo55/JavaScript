const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

app.use(bodyParser.json()); //use this instead of app.use(bodyParser.json({ type: 'application/json' })); for simplification

app.use(cors());

app.use(express.static(path.join(__dirname, '..', '/client')));

const apiRoutes = require('./api/routes.js');

app.use('/api', apiRoutes);

app.listen(port, () => {
    // console.log(`Server is running on port: ${port}`);
});