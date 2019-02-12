const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')

const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const regEx  = require('../RegEx/jsonRgx')
const { remplazarContenido } = require('./remplazarContenido')


function remplazarCampoConCondicionContenidoCmp (archivo, condicionContenido,
    nomCampo, nomCmp, nuevoContenidoCampo) {

    let contenidoArchivo = extraerContenidoRecodificado(archivo)
    let contenidoEditar = contenidoArchivo + '\n['

    if (regEx.Crear.extraerCmpPorNom(nomCmp).test(contenidoEditar)) {

        let componenteSelecionado = regEx.Extraer.extraerCmpPorNom(contenidoEditar, nomCmp).join('')

        if (regEx.Crear.campoSinDigito(nomCampo).test(contenidoEditar)) {

            let campoContenido = regEx.Extraer.extraerCampoContenido(componenteSelecionado, nomCampo).join('')

            if (new RegExp(`${condicionContenido}`,`gi`).test(campoContenido)) {

                let nuevoCampo = campoContenido.replace(/(?<=^.*?=).*/gm, '') + nuevoContenidoCampo
                console.log(`------------------------------------------------------------------`)
                console.log(`***  Remplazo  ***`)
                console.log(`Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
                console.log(`Componente: \"${nomCmp}\"`)
                console.log(`Campo: \"${campoContenido}\"`)
                console.log(`Campo editado: \"${nuevoCampo}\"`)
                console.log(`------------------------------------------------------------------`)
                // pcrArchivos.crearArchivo('Testing\\'+regEx.Borrar.clsRuta(archivo)+ 'loooooooool',extraerContenidoRecodificado(archivo) )
                return remplazarContenido(contenidoArchivo, campoContenido, nuevoCampo)

            } else {
                console.log(`------------------------------------------------------------------`)
                console.log(`***  Omicion  ***`)
                console.log(`Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`
                + `\nComponente: \"[${nomCmp}]\"`
                + `\nSin coincidencia con: \"${nomCampo}=${condicionContenido}\"`
                + `\nCampo: \"${campoContenido}\"` )
                console.log(`------------------------------------------------------------------`)
                //return contenidoArchivo
            }
        } else {
            console.log(`------------------------------------------------------------------`)
            console.log(`***  Omicion  ***`)
            console.log(`No existe el campo: \"${nomCampo}\"`
            + `\nEn el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            console.log(`------------------------------------------------------------------`)
            //return contenidoArchivo
        }

    } else {
    console.log(`------------------------------------------------------------------`)
    console.log(`***  Omicion  ***`)
    console.log(`No existe el componente: ${nomCmp}`
    + `\nEn el archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
    console.log(`------------------------------------------------------------------`)
    //return contenidoArchivo
    }
}

const operarCambio = (archivo, condicionCampo, nomCampo, nomCmp, nuevoContenidoCampo) => {
   
         remplazarCampoConCondicionContenidoCmp(
            archivo,
            condicionCampo,
            nomCampo,
            nomCmp,
            nuevoContenidoCampo
        )
    
}
module.exports.operarCambio = operarCambio