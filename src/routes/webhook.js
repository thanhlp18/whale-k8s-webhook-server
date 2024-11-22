const express = require("express");
const { verifySignature } = require("../utils/github");
const { restartDeployment } = require("../services/kubernetes");

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Received webhook request");

    if (!verifySignature(req)) {
        console.log("Invalid signature");
        return res.status(401).send("Invalid signature");
    }

    const inputs = req.body.inputs || {};
    const deploymentName = inputs.deployment || "default-deployment";
    const namespace = inputs.namespace || "default-namespace";

    console.log(`Deployment: ${deploymentName}, Namespace: ${namespace}`);

    try {
        await restartDeployment(deploymentName, namespace);
        console.log(`Rollout triggered for ${deploymentName} in ${namespace}`);
        return res.status(200).send(`Rollout triggered for ${deploymentName} in ${namespace}`);
    } catch (error) {
        console.error(`Error during rollout: ${error.message}`);
        return res.status(500).send("Failed to trigger rollout");
    }
});

module.exports = router;