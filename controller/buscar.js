'use strict'

const jp = require('jsonpath');
const _ = require('underscore');

function buscar(req, res) {
    try {
        let arbolBinario = req.body.arbolBinario;
        let nodo1 = req.body.nodo1;
        let nodo2 = req.body.nodo2;
        if (validarNodo(arbolBinario, nodo1) && validarNodo(arbolBinario, nodo2)) {
            Promise.all([buscarAncestrosNodo(arbolBinario, nodo1), buscarAncestrosNodo(arbolBinario, nodo2)]).then(valores => {
                let nodos1 = valores[0];
                let nodos2 = valores[1];
                let nodos = _.intersection(nodos1, nodos2);
                res.status(200).send({ message: `Ancestro común más cercano: ${nodos[nodos.length - 1]}` });
            });
        } else {
            res.status(400).send({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

function validarNodo(arbolBinario, nodo) {
    let datos = jp.query(arbolBinario, `$..dato`);
    return datos && datos.includes(nodo);
}

function buscarAncestrosNodo(arbolBinario, nodo) {
    return new Promise((resolve, reject) => {
        let nodos = buscarNodos(arbolBinario, nodo, []);
        resolve(nodos);
    });
}

function buscarNodos(arbolBinario, nodo, nodos) {
    if (arbolBinario === null) {
        return nodos;
    } else if (nodo < arbolBinario.dato) {
        nodos.push(arbolBinario.dato);
        return buscarNodos(arbolBinario.izquierda, nodo, nodos);
    } else if (nodo > arbolBinario.dato) {
        nodos.push(arbolBinario.dato);
        return buscarNodos(arbolBinario.derecha, nodo, nodos);
    } else {
        return nodos;
    }
}

module.exports = { buscar };