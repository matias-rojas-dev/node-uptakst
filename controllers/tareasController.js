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