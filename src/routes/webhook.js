const express = require('express');
const { verifySignature } = require('../utils/github');
const { restartDeployment } = require('../services/kubernetes');

const router = express.Router();

router.post('/webhook', async (req, res) => {
    if (!verifySignature(req)) {
        return res.status(401).send('Invalid signature');
    }

    const event = req.headers['x-github-event'];
    const action = req.body.action;

    if (event === 'workflow_run' && action === 'completed') {
        const status = req.body.workflow_run.conclusion;

        if (status === 'success') {
            const inputs = req.body.inputs || {};
            const deploymentName = inputs.deployment || 'default-deployment';
            const namespace = inputs.namespace || 'default-namespace';

            try {
                await restartDeployment(deploymentName, namespace);
                return res.status(200).send(`Rollout triggered for ${deploymentName} in ${namespace}`);
            } catch (error) {
                console.error(`Error during rollout: ${error.message}`);
                return res.status(500).send('Failed to trigger rollout');
            }
        } else {
            console.log('Build not successful, no rollout triggered.');
            return res.status(200).send('No rollout triggered');
        }
    }

    res.status(400).send('Unsupported event');
});

module.exports = router;