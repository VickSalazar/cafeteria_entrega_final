var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var validador = require('../admin/validador');

router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout: 'admin/layout',
        //usuario: req.session.nombre,
        persona: req.session.nombre, novedades
    });
});

router.get('/agregar', async (req, res, next) => {
    res.render('admin/novedadesAgregar', {
        layout: 'admin/layout'
    })
});


router.post('/agregar', async (req, res, next) => {
    try {        
        let obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }  

        let obj_error = await validador.validarNovedad(obj);
       
        //if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.cuerpo != '') {
        if (!obj_error.error) {
            await novedadesModel.insertarNovedad(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/novedadesAgregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Hay errores en los campos del formulario',
                novedad: obj,
                obj_error: obj_error
            })
        }

    } catch (error) {
        res.render('admin/novedadesAgregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la novedad, hubo un error de base de datos'
        })
    }

});

router.get('/eliminar/:id', async (req, res, next) => {    
    let id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades');
});

router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/novedadesModificar', {
        layout: 'admin/layout',
        novedad
    })
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }

        let obj_error = await validador.validarNovedad(obj);

        //if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.cuerpo != '') {
        if (!obj_error.error) {
            await novedadesModel.modificarNovedadById(obj, req.body.id);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/novedadesModificar', {
                layout: 'admin/layout',
                error: true,
                message: 'Hay errores en los campos del formulario',
                novedad: obj,
                obj_error: obj_error
            })
        }

    } catch (error) {
        res.render('admin/novedadesModificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la novedad, hubo un error de base de datos'
        })
    }

});

module.exports = router;