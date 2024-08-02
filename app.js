const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const puerto = 4010;

app.use(bodyParser.json());


// nextai deply
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

app.post('/nextai_reset', (req, res) => {

    console.log("Push Detectado reset")
    CICD_nextai_reset((error, stdout, stderr) => {
        if (error) {
            console.error('Error al ejecutar el comando de reset:', error);
        } else {
            console.log('reset exitoso:', stdout);
        }
    });

    res.end()

});


const CICD_nextai = (callback) => {
    exec('cd  // && cd jtb   && git stash && git pull && pnpm install && npm run build &&  pm2 restart njsruntime', callback);
}

const CICD_nextai_reset = (callback) => {
    exec('pm2 restart njsruntime', callback);
}


app.listen(puerto, () => {
    console.log(`CICD => ${puerto}`);
});




