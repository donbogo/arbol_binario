'use strict'

function crear(req, res) {
    try {
        let body = req.body;
        let validarReq = Array.isArray(body) && body.length > 0 && !validarValoresRepetidos(body)
            && body.every(element => { return typeof element === 'number' });
        if (validarReq) {
            body.push('');
            let raiz = body[0];
            let arbolBinario = insertarNodo(body, raiz, crearNodo(body));
            res.status(200).send(arbolBinario);
        } else {
            res.status(400).send({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

function validarValoresRepetidos(datos) {
    let array = Object.assign([], datos);
    return (new Set(array)).size !== array.length;
}

function insertarNodo(datos, raiz, nodo, nodoAInsertar) {
    if (datos.length == 0 || (nodo.dato != raiz && !nodoAInsertar)) {
        return nodo;
    } else {
        let nuevoNodo = nodoAInsertar;
        if (!nuevoNodo) {
            nuevoNodo = crearNodo(datos);
        }
        if (nuevoNodo.dato < nodo.dato) {
            if (nodo.izquierda === null) {
                nodo.izquierda = nuevoNodo;
                return insertarNodo(datos, raiz, nodo);
            } else {
                insertarNodo(datos, raiz, nodo.izquierda, nuevoNodo);
                return insertarNodo(datos, raiz, nodo);
            }
        } else {
            if (nodo.derecha === null) {
                nodo.derecha = nuevoNodo;
                return insertarNodo(datos, raiz, nodo);
            } else {
                insertarNodo(datos, raiz, nodo.derecha, nuevoNodo);
                return insertarNodo(datos, raiz, nodo);
            }
        }
    }
}

function crearNodo(datos) {
    let nodo = {
        dato: datos[0],
        izquierda: null,
        derecha: null
    };
    datos.shift();
    return nodo;
}

module.exports = { crear };