const dotenv = require('dotenv');

const fs = require('fs');

const path = require('path');

const envFilePath = path.resolve(__dirname, '.env');

dotenv.config({ path: envFilePath });



let response = {

    "user": process.env.USER || "Vignesh",

    "access_key": process.env.ACCESS_KEY,

    "client_token": process.env.CLIENT_TOKEN,

    "secret_key": process.env.SECRET_KEY,

}

// console.log("Configuration:");

// console.log("--->", process.env);

// console.log(response);



module.exports = response
