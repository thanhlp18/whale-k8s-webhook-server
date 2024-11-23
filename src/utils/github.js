const crypto = require("crypto");
const { githubSecret, webhookSecret } = require("../config");

const verifySignature = (req) => {
  const WEBHOOK_SECRET = req.headers["x-webhook-signature"];
  // const body = JSON.stringify(req.body);
  // const hmac = crypto.createHmac('sha256', githubSecret);
  // const digest = `sha256=${hmac.update(body).digest('hex')}`;
  return WEBHOOK_SECRET === webhookSecret;
};

module.exports = { verifySignature };
