const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port}`);
});