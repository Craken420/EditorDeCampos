const path = require('path')

/*** Archivos ***/
const leerCarpeta = require('./Utilerias/OperadoresArchivos/leerCarpeta')

/*** Operadores de archivos ***/
const filtro = require('./Utilerias/OperadoresArchivos/filtrarArchivos')
const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const regEx  = require('./Utilerias/RegEx/jsonRgx')
const { denpendedor } = require('./Utilerias/OperarCadenas/remplazarCampoContenidoIntls')
const carpeta = 'Archivos\\'

//MultiArchivo
leerCarpeta.obtenerArchivos(carpeta)
    .then(archivos => {
        filtro.filtrarExtensionManual(archivos, ['.frm']).forEach(archivo => {
                //Mono archivo
                denpendedor(
                    archivo,
                    true,
                    false,
                    ['Normal', 'm', 'l'],
                    'VentanaTipoMarco',
                    ['Forma', 'zonasAgentes'],
                    'Sencillo'
                )
            
        })
    })
    .catch(e => console.error(e))