const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;

// Initialize the AWS Secrets Manager client
const secretsManager = new AWS.SecretsManager({
    region: 'ap-south-1' // Make sure this is your actual AWS region
});

// Function to get secret value
const getSecretValue = async (secretName) => {
    try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        if ('SecretString' in data) {
            return data.SecretString;
        } else {
            let buff = Buffer.from(data.SecretBinary, 'base64');
            return buff.toString('ascii');
        }
    } catch (err) {
        console.error('Failed to retrieve secret:', err);
        return null;
    }
};

// API endpoint to print the secret value
app.get('/secret/:name', async (req, res) => {
    const secretName = req.params.name;
    const secretValue = await getSecretValue(secretName);
    
    if (secretValue) {
        res.send(`The value of the secret ${secretName} is: ${secretValue}`);
    } else {
        res.status(500).send('Failed to retrieve the secret value');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
