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

exports.projectsNuevo = (req, res) => {
    res.send('Enviaste el formulario')
}