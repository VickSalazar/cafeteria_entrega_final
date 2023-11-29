var productosModel = require('../../models/productosModel');

// Validaciones generales
const cantidad = "cantidad";
const error_campo_requerido = "Campo requerido";
const error_campo_longitud = "El campo debe tener hasta " + cantidad + " caracteres";

// Validaciones productos
const error_producto_precio_invalido = "El precio debe ser un entero, mayor a 0 y de hasta 8 dígitos";
const error_tipo_ribbon_invalido = "El tipo de ribbon debe ser verde, rojo o azul";
const error_texto_ribbon_requerido = "Debe completar texto ribbon para el tipo ribbon elegido";
const error_texto_ribbon_no_completar = "No debe completar texto ribbon para el tipo ribbon elegido";
const error_texto_ribbon_invalido_para_tipo_descuento = "Texto ribbon debe ser un número entero entre 0 y 100";
const error_existe_producto_con_igual_titulo = "Ya existe un producto con el mismo título";

// Constantes tipo_ribbon
const tipo_ribbon_verde = 1;

async function validarNovedad(obj) {
    let obj_error = {
        error: false,
        error_titulo: false,
        error_subtitulo: false,
        error_cuerpo: false,
        message_titulo: " ",
        message_subtitulo: " ",
        message_cuerpo: " "
    }

    // validar título
    if ((obj.titulo == '') || (obj.titulo.trim() == '')) {
        obj_error.message_titulo = error_campo_requerido;
    } else {
        obj.titulo = obj.titulo.trim();
        if (obj.titulo.length > 250) {
            obj_error.message_titulo = error_campo_longitud.replace(cantidad, "250");
        }
    }

    // validar subtítulo
    if ((obj.subtitulo == '') || (obj.subtitulo.trim() == '')) {
        obj_error.message_subtitulo = error_campo_requerido;
    } else {
        obj.subtitulo = obj.subtitulo.trim();
    }

    // validar cuerpo
    if ((obj.cuerpo == '') || (obj.cuerpo.trim() == '')) {
        obj_error.message_cuerpo = error_campo_requerido;
    } else {
        obj.cuerpo = obj.cuerpo.trim();
    }

    // cargar cada error boolean
    obj_error.error_titulo = (obj_error.message_titulo.trim() != '');
    obj_error.error_subtitulo = (obj_error.message_subtitulo.trim() != '');
    obj_error.error_cuerpo = (obj_error.message_cuerpo.trim() != '');

    // cargar error general boolean
    obj_error.error = obj_error.error_titulo ||
        obj_error.error_subtitulo ||
        obj_error.error_cuerpo;


    return obj_error;
}

async function validarProducto(obj, id) {

    let obj_error = {
        error: false,
        error_titulo: false,
        error_precio: false,
        error_tipo_ribbon: false,
        error_texto_ribbon: false,
        error_imagen: false,
        message_titulo: " ",
        message_precio: " ",
        message_tipo_ribbon: " ",
        message_texto_ribbon: " ",
        message_imagen: " "
    }

    // validar título
    if ((obj.titulo == '') || (obj.titulo.trim() == '')) {
        obj_error.message_titulo = error_campo_requerido;
    } else {
        obj.titulo = obj.titulo.trim();
        if (obj.titulo.length > 35) {
            obj_error.message_titulo = error_campo_longitud.replace(cantidad, "35");
        } else {
            let obj_aux = await productosModel.getProductoByTitulo(obj.titulo);
            
            if (obj_aux != null && (id == '' || id != obj_aux.id)) {                
                obj_error.message_titulo = error_existe_producto_con_igual_titulo;               
            }
        } 
    }

    // validar precio
    if ((obj.precio == '') || (obj.precio.trim() == '')) {
        obj_error.message_precio = error_campo_requerido;
    } else {
        obj.precio = obj.precio.trim();         
        if ( !await validarNumeroEntero(obj.precio, 8)) {
            obj_error.message_precio = error_producto_precio_invalido;
        }
    }

    // validar tipo_ribbon
    let tipo_ribbon = null;
    if ((obj.tipo_ribbon == '') || (obj.tipo_ribbon.trim() == '')) {
        ;
    } else {
        tipo_ribbon = await productosModel.getTipoRibbonById(obj.tipo_ribbon);
        if (tipo_ribbon == null) {
            obj_error.message_texto_ribbon = error_tipo_ribbon_invalido;
        }
    }

    // validar texto_ribbon
    if ((obj.texto_ribbon == '') || (obj.texto_ribbon.trim() == '')) {       
        if (tipo_ribbon != null && tipo_ribbon.completar_texto) {           
            obj_error.message_texto_ribbon = error_texto_ribbon_requerido;          
        }
      
    } else {
        obj.texto_ribbon = obj.texto_ribbon.trim();
        if (tipo_ribbon != null && tipo_ribbon.completar_texto) {
            if (obj.tipo_ribbon == tipo_ribbon_verde) {
                if (! await validarNumeroEnteroDesdeHasta(obj.texto_ribbon, 1, 100)) {
                    obj_error.message_texto_ribbon = error_texto_ribbon_invalido_para_tipo_descuento;
                }
            }
        } else {
            obj_error.message_texto_ribbon = error_texto_ribbon_no_completar;           
        }
    }

    // validar imagen
    // a futuro

    // cargar cada error boolean
    obj_error.error_titulo = (obj_error.message_titulo.trim() != '');
    obj_error.error_precio = (obj_error.message_precio.trim() != '');
    obj_error.error_tipo_ribbon = (obj_error.message_tipo_ribbon.trim() != '');
    obj_error.error_texto_ribbon = (obj_error.message_texto_ribbon.trim() != '');
    obj_error.error_imagen = (obj_error.message_imagen.trim() != '');

    // cargar error general boolean
    obj_error.error = obj_error.error_titulo ||
        obj_error.error_precio ||
        obj_error.error_tipo_ribbon ||
        obj_error.error_texto_ribbon ||
        obj_error.error_imagen;

    return obj_error;
}

async function validarNumeroEntero(numero, tamanio) {
    if (tamanio != '') {
        if (numero.length > tamanio) {
            return false;
        }
    }
    return /^\d+$/.test(numero);
}

async function validarNumeroEnteroDesdeHasta(numero, numeroDesde, numeroHasta) { 
    
    if (await validarNumeroEntero(numero, '')) {
        var numeroInt = parseInt(numero);
        return !((numeroInt < numeroDesde || numeroInt > numeroHasta));
    }
    return false;
}

module.exports = { validarNovedad, validarProducto }