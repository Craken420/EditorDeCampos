const fs = require('fs')

/*** Operadores de archivos ***/
const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const carpeta = 'Testing\\'
const { listar } = require('./Utilerias/OperarCadenas/listas')
const { operarCambio } = require('./Utilerias/OperarCadenas/cambiarContenidoCampo')

fs.readdir(carpeta, (err, archivos) => {
    if (err) {
      throw err
    } archivos.filter(archivo => {
      return  /\.frm$/i.test(archivo) && fs.statSync(carpeta+archivo).isFile()
    }).forEach(archivo => {

        let respuesta = operarCambio(
            carpeta + archivo,
            'Normal',
            'VentanaTipoMarco',
            'Forma',
            'Sencillo'
        )

        if (respuesta != false){
            // Mono archivo
            pcrArchivos.crearArchivo(carpeta + archivo, respuesta)
        }

        listar(carpeta + archivo)

        })
    })