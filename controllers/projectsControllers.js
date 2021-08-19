const Projects = require('../models/Projects')

// .render: allows add html items
exports.projectsHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    })
}

exports.projectsNosotros = (req, res) => {
    res.render('nosotros', {
        nombrePagina: 'Nosotros'
    })
};

exports.projectsFormulario = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.projectsNuevo = async (req, res) => {
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
            errores
        })
    } else { // if not errors exists, add at bd
        //const url = slug(nombre).toLowerCase(); // dinamic url
        const project = await Projects.create({ nombre });
        res.redirect('/')

    }


}