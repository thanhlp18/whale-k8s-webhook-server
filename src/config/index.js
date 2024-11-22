const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    githubSecret: process.env.WEBHOOK_SECRET || 'default-secret',
};