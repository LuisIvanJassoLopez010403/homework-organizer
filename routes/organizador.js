var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {
    obtenerSaludo,
    listadoTareas,
    crearTarea,
    concluirTarea,
    eliminarTarea
} = require('../controllers/organizador.controller');

router.get('/obtener-saludo', obtenerSaludo);
router.get('/listado-tareas', listadoTareas);
router.post('/crear-tarea', crearTarea);
router.post('/concluir-tarea',concluirTarea);
router.post('/eliminar-tarea', eliminarTarea);

module.exports = router;

