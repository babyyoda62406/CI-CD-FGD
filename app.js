const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const puerto = 4000;

app.use(bodyParser.json());


// Teodoro
app.post('/nextai', (req, res) => {

    console.log("Push Detectado")
    const { ref } = req.body
    switch (ref) {
        case "refs/heads/main":
            CICD_nextai((error, stdout, stderr) => {
                if (error) {
                    console.error('Error al ejecutar el comando de despliegue:', error);
                } else {
                    console.log('Despliegue exitoso:', stdout);
                }
            });
            break;
        default:
            console.log(ref)
    }

    res.end()

});


const CICD_nextai = (callback) => {
    exec('cd  // && cd jtb   && git stash && git pull && pnpm install && npm run build &&  pm2 restart njsruntime', callback);
}


app.listen(puerto, () => {
    console.log(`CICD => ${puerto}`);
});




