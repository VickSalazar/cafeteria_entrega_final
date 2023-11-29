var express = require('express');
var router = express.Router();
var productosModel = require('../../models/productosModel');
var validador = require('../admin/validador');
var utiles = require('../admin/utiles');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    var productos = await productosModel.getProductos();

    productos = productos.map(producto => {
        if (producto.imagen_id) {
            const imagen = cloudinary.image(producto.imagen_id, {
                width: 100,
                height: 100,
                crop: 'fill' // pad
            });
            return {
                ...producto,
                imagen
            }
        } else {
            return {
                ...producto,
                imagen: ''
            }
        }
    });

    res.render('admin/productos', {
        layout: 'admin/layout',
        //usuario: req.session.nombre,
        persona: req.session.nombre, productos
    });
});

router.get('/agregar', async (req, res, next) => {

    // Datos para el select tipos_ribbon
    let tipos_ribbon = await productosModel.getTiposRibbon();
    tipos_ribbon = await utiles.getTiposRibbonParaSelect(tipos_ribbon, '');

    res.render('admin/productosAgregar', {
        layout: 'admin/layout',
        tipos_ribbon
    })
});


router.post('/agregar', async (req, res, next) => {
    try {
        let obj = {
            titulo: req.body.titulo,
            precio: req.body.precio,
            tipo_ribbon: req.body.tipo_ribbon,
            texto_ribbon: req.body.texto_ribbon
        }

        var imagen_id = null;
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            imagen_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        let obj_error = await validador.validarProducto(req.body, '');

        //if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.cuerpo != '') {
        if (!obj_error.error) {
            await productosModel.insertarProducto({
                ...req.body, // spread > titulo precio tipo_ribbon texto_ribbon
                imagen_id
            });
            res.redirect('/admin/productos');
        } else {

            // Datos para el select tipos_ribbon
            let tipos_ribbon = await productosModel.getTiposRibbon();
            tipos_ribbon = await utiles.getTiposRibbonParaSelect(tipos_ribbon, req.body.tipo_ribbon);

            res.render('admin/productosAgregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Hay errores en los campos del formulario',
                producto: req.body,
                obj_error: obj_error,                
                tipos_ribbon
            })
        }

    } catch (error) {
        res.render('admin/productosAgregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó el producto, hubo un error de base de datos'
        })
    }

});

router.get('/eliminar/:id', async (req, res, next) => {
    let id = req.params.id;

    // Elimino imágen de cloudinary
    let producto = await productosModel.getProductoById(id);
    if (producto.imagen_id) {
        await (destroy(producto.imagen_id));
    }

    await productosModel.deleteProductoById(id);
    res.redirect('/admin/productos');
});

router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let producto = await productosModel.getProductoById(id);
    
    // Datos para el select tipos_ribbon
    let tipos_ribbon = await productosModel.getTiposRibbon();
    tipos_ribbon = await utiles.getTiposRibbonParaSelect(tipos_ribbon, producto.tipo_ribbon);  

    res.render('admin/productosModificar', {
        layout: 'admin/layout',
        producto,
        tipos_ribbon
    })
});

router.post('/modificar', async (req, res, next) => {
    try {

        let imagen_id = req.body.imagen_original;
        let borrar_imagen_vieja = false;
        if (req.body.imagen_delete === "1") {
            imagen_id = null;
            borrar_imagen_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                imagen_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_imagen_vieja = true;
            }
        }
        if (borrar_imagen_vieja && req.body.imagen_original) {
            await (destroy(req.body.imagen_original));
        }


        let obj = {
            titulo: req.body.titulo,
            precio: req.body.precio,
            tipo_ribbon: req.body.tipo_ribbon,
            texto_ribbon: req.body.texto_ribbon,
            imagen_id
        }
        
        let obj_error = await validador.validarProducto(obj, req.body.id);

        //if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.cuerpo != '') {
        if (!obj_error.error) {
            await productosModel.modificarProductoById(obj, req.body.id);
            res.redirect('/admin/productos')
        } else {
            // Datos para el select tipos_ribbon
            let tipos_ribbon = await productosModel.getTiposRibbon();
            tipos_ribbon = await utiles.getTiposRibbonParaSelect(tipos_ribbon, req.body.tipo_ribbon);  

            res.render('admin/productosModificar', {
                layout: 'admin/layout',
                error: true,
                message: 'Hay errores en los campos del formulario',
                producto: req.body,
                obj_error: obj_error,
                tipos_ribbon
            })
        }

    } catch (error) {
        res.render('admin/productosModificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó el producto, hubo un error de base de datos'
        })
    }

});

module.exports = router;