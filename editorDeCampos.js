/*** Sub-modulos ***/

/* Operadores de archivos */
const { leerCarpetaFiltrada } = require('./Utilerias/OperadoresArchivos/readDirOnlyFile')

const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')

/* Operadores de cadena */
const { extraerCmpLista } = require('./Utilerias/OperarCadenas/extraerCmpLista')
const { operarCambio } = require('./Utilerias/OperarCadenas/cambiarContenidoCampo')

const regEx  = require('./Utilerias/RegEx/jsonRgx')

/*** Archivos ***/
const { carpetas } = require('./Utilerias/Archivos/jsonCarpetas')

leerCarpetaFiltrada(carpetas.carpetaTesting, '.frm')
    .then(archivos => {
        archivos.forEach(archivo => {

            console.log(`Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            pcrArchivos.agregarArchivo('Reporte.txt', 
              `\n--------------------------------------------------------------------------------------\n`
            + `Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)

            pcrArchivos.agregarArchivo('Reporte.txt', `Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            let respuesta = operarCambio(
                archivo,
                'Normal',
                'VentanaTipoMarco',
                'Forma',
                'Sencillo'
            )

            if (respuesta != false){
                pcrArchivos.crearArchivo(archivo, respuesta)
            }

            extraerCmpLista(archivo).forEach(campoLista => {
                let respuesta = operarCambio(
                    archivo,
                    'Negro',
                    'FichaColorFondo',
                    campoLista,
                    'Plata'
                )

                if (respuesta != false) {
                    pcrArchivos.crearArchivo(archivo, respuesta)
                }
            })
        })
    }).catch(e => console.error(e));