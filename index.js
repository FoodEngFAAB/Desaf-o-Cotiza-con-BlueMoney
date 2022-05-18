/* Importar módulo https */
const https = require("https")
const fs = require("fs")

/*Recibe los siguientes argumentos y los guarda en una variable arguments:
a. Nombre del archivo que se creará.
b. Extensión del archivo.
c. Indicador económico que se desea convertir.
d. Cantidad de pesos que se quiere cambiar.*/

const arguments = process.argv.slice(2)
const file = arguments[0]
const extension = arguments[1]
const economicIndex = arguments[2]
const clPesos = Number(arguments[3])


/* Usa  método get del módulo https para consumir API */
https
    .get("https://mindicador.cl/api", (resp) => {
        let data = ''

        resp.on('data', (dataValue) => {
            data += dataValue

            //Obtiene datos en formato JSON
            const indicators = JSON.parse(data)

            //Comprueba valores
            //console.log(indicators) //OK
            //console.log(file) //OK
            //console.log(extension) //OK
            //console.log(economicIndex) //OK
            //console.log(clPesos) //OK

            //Obtiene valor del indicador económico referencial
            let indexValue = indicators[`${economicIndex}`].valor
            //console.log(indexValue)

            //Ejecuta la conversión
            let conversion = (clPesos / indexValue).toFixed(8)
            //console.log(conversion)

            //Registra las consultas en un archivo de texto usando el template dado
            fs.writeFile(`${file}.${extension}`, `A la fecha: ${Date()}:\n
            Fue realizada cotización con los siguientes datos:\n
            Cantidad de pesos a convertir: ${clPesos} pesos.\n
            Convertido a ${economicIndex} da un total de:\n            
            ${conversion} ${economicIndex}.`, () => {

                //Envia por consola el contenido del archivo luego de que haya sido creado.
                const finalAnswer = fs.readFileSync(`${file}.${extension}`, 'utf-8')
                console.log(finalAnswer)
            })
        })
    })



    /* Usar el método “on” del callback del método get especificando el evento “error” para imprimir por consola en su callback el posible error generado por la consulta. */
    .on('error', (err) => {
        console.log("Error: " + err.message);
    })

    //Ejecutar index.js 'Nombre del archivo' 'Extensión del archivo' 'Indicador económico que se desea convertir' 'Cantidad de pesos que se quiere cambiar'