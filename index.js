const express = require('express')
const app = express();
const port =3000;
const AWS = require('aws-sdk');
 

 
const secretsManager = new AWS.SecretsManager({
    region: 'ap-south-1' // e.g., 'us-west-2'
});
 
 Function to get secret value
const getSecretValue = async (secretName) => {
    console.log("===========");
    try {
        
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        console.log("Data :",data);
        if ('SecretString' in data) {
            console.log("SecretString: ",data);
            return data.SecretString;
        } else {
            let buff = Buffer.from(data.SecretBinary, 'base64');
            return buff.toString('ascii');
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};
 
 API endpoint to print the secret value
 app.get('/secret/:name', async (req, res) => {
     console.log("Input-->",req.params);
     const secretName = req.params.name;
     const secretValue = await getSecretValue(secretName);
    
     if (secretValue) {
         res.send(`The value of the secret ${secretName} is: ${secretValue}`);
     } else {
         res.status(500).send('Failed to retrieve the secret value');
     }
 });
 

getSecretValue("demo-secret")


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
 

