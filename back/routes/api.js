var express = require('express');
var router = express.Router();
var productosModel = require('../models/productosModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

/* Al final lo saqué, era para mandar una imagen por defecto cuando la imagen del producto es null
//  imágen por defecto para mandar cuando un producto no tenga imagen asociada
const imagenProductoDefecto = "http://res.cloudinary.com/dmkhux6or/image/upload/c_fill,h_176,w_132/q9ulvqqvr8y4byw5zby6";
*/

// Disponible en http://localhost:3000/api/productos
router.get('/productos', async function (req, res, next) {
    var productos = await productosModel.getProductosApi();

    productos = productos.map(productos => {
        if (productos.imagen_id) {
            const imagen = cloudinary.url(productos.imagen_id, {
                width: 132,
                height: 176,
                crop: 'fill' // pad
            });
            return {
                ...productos,
                imagen
            }
        } else {
            return {
                ...productos,
                imagen: ''//imagenProductoDefecto al final mando vacio porque es como vimos en clase
            }
        }
    });

    res.json(productos);
});

router.post('/contacto', async (req, res) => {


    const mail = {
        to: 'v_salazarr@hotmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contactó a través de la web y quiere más información a este correo: 
                  ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }); // cierra transporte

    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        mensaje: 'Mensaje enviado'
    });


}); // cierra post/api

module.exports = router;