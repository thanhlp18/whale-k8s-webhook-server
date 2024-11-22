const { exec } = require('child_process');

const restartDeployment = (deploymentName, namespace) => {
    return new Promise((resolve, reject) => {
        const command = `kubectl rollout restart deployment ${deploymentName} -n ${namespace}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Kubernetes command failed: ${stderr}`);
                reject(new Error(stderr));
            } else {
                console.log(`Kubernetes command output: ${stdout}`);
                resolve(stdout);
            }
        });
    });
};

module.exports = { restartDeployment };