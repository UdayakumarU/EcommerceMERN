const fs = require('fs');
const path = require("path");

let requestLogger = (req, res, next) => {
    let today = new Date();
    let logMessage = today.toDateString() + " " +today.toLocaleTimeString()+ " " +req.method+ " " +req.url+ "\n"; 
    fs.appendFile(path.resolve(__dirname ,'./../logs/RequestLogger.txt'), logMessage , (err) => {
        if (err){
            console.log("Logging request failed");
            return (err);
        } 
    });
    next();
}

module.exports = requestLogger;