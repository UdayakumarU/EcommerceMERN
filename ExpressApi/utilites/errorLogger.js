const fs = require('fs');
const path = require('path')

let errorLogger = (err,req, res, next) => {
    if(err){
        let today = new Date();
        let errorStack = today.toDateString() + " " +today.toLocaleTimeString()+ " - " + err.stack + "\n"; 
        fs.appendFile(path.resolve(__dirname, './../logs/ErrorLogger.txt'), errorStack , (err) => {
            if (err) console.log("Logging error failed");
        });
        if(err.status){
            res.status(err.status);
        } else {
            res.status(500)
        }
        res.json({"errorMessage" : err.message});
    }
    next();
}

module.exports = errorLogger;