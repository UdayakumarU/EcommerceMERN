const fs = require('fs');
const path = require('path')

let errorLogger = (err,req, res, next) => {
    if(err){
        let today = new Date();
        let errorStack = today.toDateString() + " " +today.toLocaleTimeString()+ " - " + err.stack + "\n"; 
        fs.appendFile(path.resolve(__dirname, './../logs/ErrorLogger.txt'), errorStack , (err) => {
            if (err) console.log("Logging error failed");
        });
        res.status(err.status || 500).json({"errorMessage" : err.message});
    }
    next();
}

module.exports = errorLogger;