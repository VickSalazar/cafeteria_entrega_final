async function getTiposRibbonParaSelect(tipos_ribbon, valor_seleccionado) {
    lista = tipos_ribbon.map(tipo_ribbon => {
        return {
            ...tipo_ribbon,
            seleccionado: (tipo_ribbon.id == valor_seleccionado)
        }
    });    
    lista.unshift({id:'', descripcion:'', texto_ribbon:'', color_ingles:'', seleccionado:(valor_seleccionado == '')});
   
    return lista;
}

module.exports = { getTiposRibbonParaSelect }