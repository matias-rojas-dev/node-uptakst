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

exports.changeTaskStatus = async (req, res, next) => {
    const { id } = req.params; // get the task id
    const task = await Tareas.findOne({ // filter this id
        where: { id: id }
    });

    // change status
    let status = 0;

    if (task.estado === status) {
        status = 1;
    }

    task.estado = status;

    const result = await task.save(); // save in the database

    if (!result) return next();

    res.status(200).send('TODO BIEN')
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const result = await Tareas.destroy({ where: { id: id } });

    if (!result) return next();

    res.send('Task has been deleted')
}


