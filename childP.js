
//Llamado, impmortaciòn del mòdulo child_process
const childProcess = require('child_process')

//ejecuta el mòdulo con los argumentos dados para el archivo index.js
childProcess.exec('node index.js moneyConv txt dolar 19990',
    function (error, stdout, stderr) {
        console.log(stdout)
    }
)
