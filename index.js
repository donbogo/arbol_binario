'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const api = require('./routers/api');
const app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/arbol_binario', api);

app.get('/', (req, res) => {
    res.status(200).send({ message: 'ARBOL BINARIO' });
});

app.listen(PORT, () => {
    console.log('Server runing on localhost:' + PORT);
});