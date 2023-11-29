var pool = require('./bd');
var md5 = require('md5');

async function getProductos() {
  try {

    var query = "select p.id, p.titulo, p.precio, tr.descripcion as descripcion_tipo_ribbon, p.texto_ribbon, p.imagen_id, tr.color_ingles " +
      " from productos p left join tipos_ribbon tr on p.tipo_ribbon = tr.id  order by p.id ";

    var rows = await pool.query(query);

    return rows;

  } catch (error) {
    throw error;
  }
}

async function getProductosApi() {
  try {

    var query = "select p.id, p.titulo, p.precio, p.imagen_id, " +
      " CASE WHEN p.texto_ribbon IS NOT NULL THEN CONCAT(p.texto_ribbon, ' %' ) " +
      "      WHEN tr.id IS NOT NULL THEN tr.descripcion " +
      "      ELSE '' " +
      " END as texto_ribbon, " +
      " CASE WHEN tr.color_ingles = 'green' THEN 'ribbon' " +
      "      WHEN tr.color_ingles IS NOT NULL THEN CONCAT('ribbon ', tr.color_ingles) " +
      "      ELSE '' " +
      " END as clase_ribbon " +
      " from productos p left join tipos_ribbon tr on p.tipo_ribbon = tr.id  order by p.id ";

    var rows = await pool.query(query);

    return rows;

  } catch (error) {
    throw error;
  }
}

async function setearCamposVaciosEnNull(obj) {
  
  if (obj.tipo_ribbon == '') {
    obj.tipo_ribbon = null;
  }
  
  if (obj.texto_ribbon.trim() == '') {
    obj.texto_ribbon = null;  
  }  
  
}

async function insertarProducto(obj) {
  try {
    await setearCamposVaciosEnNull(obj);

    var query = "insert into productos set ?";
    var rows = await pool.query(query, [obj]);
    return rows;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


async function deleteProductoById(id) {
  try {

    var query = "delete from productos where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;

  } catch (error) {
    throw error;
  }
}

async function getProductoById(id) {
  try {

    var query = "select * from productos where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];

  } catch (error) {
    throw error;
  }
}

async function getProductoByTitulo(titulo) {
  try {

    var query = "select * from productos where lower(titulo) = ? ";
    var rows = await pool.query(query, [titulo.toLowerCase()]);
    return rows[0];

  } catch (error) {
    throw error;
  }
}

async function modificarProductoById(obj, id) {
  try {
  
    await setearCamposVaciosEnNull(obj);
    
    var query = "update productos set ? where id = ? ";
    var rows = await pool.query(query, [obj, id]);
   
    return rows;

  } catch (error) {
    throw error;
  }
}

async function getTiposRibbon() {
  try {

    var query = "select * from tipos_ribbon order by id ";
    var rows = await pool.query(query);
    return rows;

  } catch (error) {
    throw error;
  }
}

async function getTipoRibbonById(id) {
  try {

    var query = "select * from tipos_ribbon where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];

  } catch (error) {
    throw error;
  }
}

module.exports = { getProductos, getProductosApi, insertarProducto, deleteProductoById, getProductoById, getProductoByTitulo, modificarProductoById, getTiposRibbon, getTipoRibbonById }