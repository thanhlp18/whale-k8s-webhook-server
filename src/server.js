const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');

const app = express();

app.use(bodyParser.json());
app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
    res.send('Webhook server is running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;