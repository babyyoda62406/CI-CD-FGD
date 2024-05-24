const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const puerto = 4000;

app.use(bodyParser.json());


// Teodoro
app.post('/teodoro', (req, res) => {

    console.log("Push Detectado")
    const { ref } = req.body
    switch (ref) {
        case "refs/heads/v1":
            CICD_teodoro((error, stdout, stderr) => {
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

// Grafiska
app.post('/grafiska', (req, res) => {

    console.log("Push Detectado")
    const { ref } = req.body
    switch (ref) {
        case "refs/heads/v1":
            CICD_Grafiska((error, stdout, stderr) => {
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

const CICD_teodoro = (callback) => {
    exec('cd /root/totalrepairs  && git stash && git pull && pnpm install && npm run build &&  pm2 restart teodoro', callback);
}

const CICD_Grafiska = (callback) => {
    exec('cd /root/Grafiska_IMGPlastic/front  && git stash && git pull && pnpm install && npm run build', callback);
}

app.listen(puerto, () => {
    console.log(`CICD => ${puerto}`);
});




