const jwt = require('jsonwebtoken');
const {ApiError} = require('../objectCreator/objectCreator');
const {JWT_KEY} = require('../keys/constant');

const userAuth = (req,res,next)=>{
   try {
        const token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, JWT_KEY.SECRET);
        req.auth = {customerId: decoded.customerId, cart: decoded.cart};
        next();
    } catch(error){
        throw new ApiError("Authentication Failed", 401);
    }
}

const sellerAuth = (req,res,next)=>{
    try {
         const token = req.headers.authorization.split(" ")[1]; 
         jwt.verify(token, JWT_KEY.SECRET);
         next();
     } catch(error){
         throw new ApiError("Authentication Failed", 401);
     }
 }

module.exports = {userAuth, sellerAuth};