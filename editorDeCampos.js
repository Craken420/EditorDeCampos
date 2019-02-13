/*** Modulos ***/
const fs = require('fs')

/*** Sub-modulos ***/

/* Operadores de archivos */
const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')

/* Operadores de cadena */
const { extraerCmpLista } = require('./Utilerias/OperarCadenas/extraerCmpLista')
const { operarCambio } = require('./Utilerias/OperarCadenas/cambiarContenidoCampo')
const regEx  = require('./Utilerias/RegEx/jsonRgx')

/*** Atributos ***/
const carpeta = 'Testing\\'

/*** Operación ***/
fs.readdir(carpeta, (err, archivos) => {
    if (err) {
      throw err
    } archivos.filter(archivo => {
      return /\.frm$/i.test(archivo) && fs.statSync(carpeta+archivo).isFile()
    }).forEach(archivo => {

        console.log(`------------------------------------------------------------------\n`)
        console.log(`Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)

        let respuesta = operarCambio(
            carpeta + archivo,
            'Normal',
            'VentanaTipoMarco',
            'Forma',
            'Sencillo'
        )

        if (respuesta != false){
            pcrArchivos.crearArchivo(carpeta + archivo, respuesta)
        }

        extraerCmpLista(carpeta + archivo).forEach(campoLista => {
            let respuesta = operarCambio(
                        carpeta + archivo,
                        'Negro',
                        'FichaColorFondo',
                        campoLista,
                        'Plata'
            )
            if (respuesta != false) {
                pcrArchivos.crearArchivo(carpeta + archivo, respuesta)
            }
        })
    })
})