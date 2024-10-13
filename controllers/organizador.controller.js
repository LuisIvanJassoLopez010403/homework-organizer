const axios = require('axios');
const { TareaModel } = require('../models/organizador.model');

async function obtenerSaludo(req, res) {
    const saludos = {
        'Domingo': [
            '¡Feliz domingo! Tiempo de descansar.',
            '¡Domingo de relajación y disfrute!',
            '¡Recarga energías para la semana!'
        ],
        'Lunes': [
            '¡Es Lunes, a empezar la semana con energía!',
            '¡Lunes de nuevos comienzos!',
            '¡Lunes, a empezar la semana con una sonrisa!'
        ],
        'Martes': [
            '¡Feliz martes! El segundo día cuenta mucho.',
            '¡Martes de productividad!',
            '¡Martes, vamos a por todas!'
        ],
        'Miércoles': [
            '¡Hoy es Miércoles, ya estamos a mitad de semana!',
            '¡Mitad de semana alcanzada!',
            '¡Feliz miércoles, ya casi es viernes!'
        ],
        'Jueves': [
            '¡Feliz jueves! El fin de semana está cerca.',
            '¡Jueves, un día más para el fin!',
            '¡Ya casi viernes! Vamos, que se puede.'
        ],
        'Viernes': [
            '¡Es viernes, por fin!',
            '¡Feliz viernes! A disfrutar.',
            '¡Es Viernes y el cuerpo lo sabe!'
        ],
        'Sábado': [
            '¡Feliz sábado! Disfruta tu fin de semana.',
            '¡Sábado de descanso y diversión!',
            '¡Es sábado, momento de relajarse!'
        ]
    };

    const diasSemana = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaActual = new Date();
    const diaActual = diasSemana[fechaActual.getDay()];

    const saludoDia = saludos[diaActual];
    const saludoAleatorio = saludoDia[Math.floor(Math.random() * saludoDia.length)];

    res.json({ saludo: saludoAleatorio });
};

async function listadoTareas(req, res) {
    try {
        const listaTareas = await TareaModel.find();
        res.status(200).json({ listaTareas });
    } catch (error) {
        console.error('Error al obtener listado de tareas:', error);
        res.sendStatus(500);
    }
};

async function crearTarea(req, res) {
    try {
        const { nombre, estado = true } = req.body; 

        const nuevaTarea = new TareaModel({ nombre, estado });
        await nuevaTarea.save();

        res.status(201).json({ tarea: nuevaTarea });
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.sendStatus(500);
    }
};

async function concluirTarea(req, res) {
    try {
        const { id } = req.body;
        const tareaActualizada = await TareaModel.findByIdAndUpdate(
            id,
            { estado: false },
            { new: true } 
        );

        if (!tareaActualizada) {
            console.log(`Tarea no encontrada`);
            return res.status(404);
        }

        res.status(200).json({ tarea: tareaActualizada });
    } catch (error) {
        console.error('Error al concluir la tarea:', error);
        res.sendStatus(500);
    }
};

async function eliminarTarea(req, res) {
    try {
        const { id } = req.body;
        const tareaEliminada = await TareaModel.findByIdAndDelete(id);

        if (tareaEliminada) {
            console.log(`Tarea con ID ${id} eliminada`);
        } else {
            console.log(`No se encontró la tarea con ID ${id}`);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.sendStatus(500);
    }
}


module.exports = { 
    obtenerSaludo, 
    listadoTareas, 
    crearTarea, 
    concluirTarea, 
    eliminarTarea
};
