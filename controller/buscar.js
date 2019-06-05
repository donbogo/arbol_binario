'use strict'

function buscar(req, res) {
    res.status(200).send({ message: 'BUSCAR ARBOL BINARIO' });
}

module.exports = { buscar };