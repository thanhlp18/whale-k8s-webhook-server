const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');

const app = express();

app.use(bodyParser.json());
app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
    res.send('Webhook server is running');
});

module.exports = app;