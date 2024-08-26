const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const puerto = 4010;

app.use(bodyParser.json());

// Hotel Deploy
app.post('/hotel', (req, res) => {
    console.log("Push Detectado");
    const { ref } = req.body;
    switch (ref) {
        case "refs/heads/main":
            CICD_hotel((error, stdout, stderr) => {
                if (error) {
                    console.error('Error al ejecutar el comando de despliegue:', error);
                    return res.status(500).send('Error en el despliegue');
                } else {
                    console.log('Despliegue exitoso:', stdout);
                    return res.status(200).send('Despliegue exitoso');
                }
            });
            break;
        default:
            console.log(ref);
            return res.status(200).send('Referencia no manejada');
    }
});

// Función de despliegue
const CICD_hotel = (callback) => {
    exec('rm -rf HotelDeutschesHaus && git clone git@github.com:FGDGines/HotelDeutschesHaus.git && cd HotelDeutschesHaus && pnpm install && npm run build && npm run up', callback);
}

app.listen(puerto, () => {
    console.log(`CICD => ${puerto}`);
});
