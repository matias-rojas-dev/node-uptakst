const Projects = require('../models/Projects');
const Tareas = require('../models/Tareas');

exports.addTask = async (req, res, next) => {
    const project = await Projects.findOne({ // get actual project
        where: {
            url: req.params.url
        }
    })

    // read the input value
    const { tarea } = req.body;

    // state = 0 -> incomplete; state = 1 -> complete
    const estado = 0;

    const projectId = project.id;

    // create in to BD
    const result = await Tareas.create({ tarea, estado, projectId })

    if (!result)
        return next()

    // redirect
    res.redirect(`/projects/${req.params.url}`)

}

exports.changeTaskState = async (req, res) => {
    const { id } = req.params;
    const task = await Tareas.findOne({
        where: { id }
    });

    // change state 0 -> 1 or 1 -> 0
    let state = 0;
    if (task.estado === state) {
        state = 1;
    }

    task.estado = state;

    const result = await task.save();

    if (!result) return next();

    res.status(200).send('Upload')

}

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    const result = await Tareas.destroy({
        where: { id }
    });

    if (!result) return next();

    res.status(200).send('Eliminando')



}