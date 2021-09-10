const Projects = require('../models/Projects');

// .render: allows add html items
exports.projectsHome = async (req, res) => {
    const allProjects = await Projects.findAll(); // show all data SELECT * from projects

    res.render('index', {
        nombrePagina: `Proyectos ${res.locals.year}`,
        allProjects,
    })
}


exports.projectsNosotros = (req, res) => {
    res.render('nosotros', {
        nombrePagina: 'Nosotros'
    })
};


exports.projectsFormulario = async (req, res) => {
    const allProjects = await Projects.findAll(); // show all data SELECT * from projects

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        allProjects,
    })
}


exports.projectsNuevo = async (req, res) => {
    const allProjects = await Projects.findAll(); // show all data SELECT * from projects

    // validate that the input isnt empty
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al proyecto' })
    }
    // if errors exists
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            allProjects,

        })
    } else { // if not errors exists, add at bd
        //const url = slug(nombre).toLowerCase(); // dinamic url
        await Projects.create({ nombre });
        res.redirect('/')

    }
}


exports.projectByUrl = async (req, res, next) => {
    const allProjectsPromise = Projects.findAll(); // show all data SELECT * from projects

    const projectPromise = Projects.findOne({
        where: { // SELECT * FROM projects WHERE id = 20 example
            url: req.params.url
        }
    })

    if (!projectPromise) return next();

    const [allProjects, project] = await Promise.all([allProjectsPromise, projectPromise])

    res.render('to-do', {
        nombrePagina: 'Tareas del proyecto',
        allProjects,
        project,
    })
}


exports.editForm = async (req, res, next) => {
    const allProjectsPromise = Projects.findAll(); // show all data SELECT * from projects

    const projectPromise = Projects.findOne({
        where: {
            id: req.params.id
        }
    });

    const [allProjects, project] = await Promise.all([allProjectsPromise, projectPromise])


    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        allProjects,
        project,
    })
}


exports.updateProject = async (req, res) => {

    const allProjects = await Projects.findAll(); // show all data SELECT * from projects

    const { nombre } = req.body;

    let errors = [];

    if (!nombre)
        errors.push({ 'texto': 'Agrega un nombre al proyecto' });

    // if errors exists
    if (errors.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errors,
            allProjects,

        })
    } else { // if not errors exists, add at bd
        await Projects.update( // UPDATE projects SET nombre="Nuevo Proyecto" WHERE nombre="..."
            { nombre: nombre },
            { where: { id: req.params.id } }
        );
        res.redirect('/')

    }

}


exports.deteleProject = async (req, res, next) => {

    const { urlProject } = req.query;
    const result = await Projects.destroy({ where: { url: urlProject } }) // ex: DELETE FROM '' WHERE id = 20

    if (!result)
        return next();

    res.send(`${urlProject} has been deleted`);
}