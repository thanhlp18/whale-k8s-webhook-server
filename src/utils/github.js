const crypto = require('crypto');
const { githubSecret } = require('../config');

const verifySignature = (req) => {
    const signature = req.headers['x-hub-signature-256'];
    const body = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', githubSecret);
    const digest = `sha256=${hmac.update(body).digest('hex')}`;
    return signature === digest;
};

module.exports = { verifySignature };