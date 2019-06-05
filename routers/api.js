'use strict'

const express = require('express');
const router = express.Router();
const crearCtrl = require('../controller/crear');
const buscarCtrl = require('../controller/buscar');

router.get('/', (req, res) => {
    res.status(200).send({ message: 'ARBOL BINARIO API ROUTER' });
});

router.post('/crearArbolBinario', crearCtrl.crear);
router.post('/ancestroComunMasCercano', buscarCtrl.buscar);

module.exports = router;