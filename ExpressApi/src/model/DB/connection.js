const mongoose = require("mongoose");
const { COLLECTION_NAME, DB_URL } = require('../../keys/constant');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

const customersObj = {
    "customerId":{ type:String, required:true },
    "customerName": { type: String, required: true },
    "customerPassword": { type: String, required: true },
    "customerEmail": { type: String, required: true },
    "customerMobile": { type: Number },
    "cart": {
        type: [{
            "productId": { type: String, required: true },
            "quantity": { type: Number, min: 1, required: true }
        }],
        default: []
    },
    "orders": {
        type: [{ type: String, required: true }],
        default: []
    },
    "uCurrency": { type : Number, default : 10 },
    "addresses":{
        type:[{
            "receiverName": { type:String, required:true },
            "receiverMobile": { type:Number, required:true },
            "landmark": { type:String },
            "area": { type:String, required:[true,"Area is required"] },
            "city": { type:String, required:[true,"City is required"] },
            "state": {type:String, required:[true,"State is required"] },
            "pincode": { type:Number, required:[true,"Pincode is required"] },
            "addressType": { type:String, enum:['H','W'] }
            }],
        default : []
    }
};

const productsObj = {
    "productId":{ type:String, required:true },
    "productName": {type:String, required: true },
    "brand": {type:String, required:true},
    "category": {type:String, required: true },
    "subCategory": {type:String, required: true },
    "productActualPrice": { type:Number, required: true },
    "discount": { type:Number, default:0 },
    "productQuantity": { type:Number, min:10, required: true },
    "description": {
        type:String,
        default:""
    },
    "highlights": {
        type: [{type:String}],
        default: []
    },
    "rating": { type:Number, default:1, min:1, max:5 },
    "reviews": {
        type: [{
            "customerId":{ type:String, required:true},
            "comment":{ type:String, required:true},
            "rating":{ type:Number, min:1, max:5, required:true },
            "reviewDate":{type:Date, required:true}
        }],
        default: []
    },
    "sellcount":{ type:Number, default:0 },
    "returnCount" : { type:Number, default:0 },
    "productImages" :{
        type:[{ type:String,required:true}],
        required : true
    },
    "sellerId" :{ type:String, required:true },
    "sizes" :{
        type : [{type : String, required:true}],
        default :[]
    },
    "colors" :{
        type : [{type : String, required:true}],
        default :[]
    }
};

const ordersObj = {
    "orderId":{ type:String, required:true },
    "customerId":{type : String, required : true},
    "product": {
        type:{
            "productId": { type: String, required: true },
            "quantity": { type: Number, min: 1, required: true }
        },
        required : true
    },
    "orderPrice":{type : Number, required: true},
    "paymentType":{type : String, required: true},
    "deliveryAddress":{
        type:{
            "receiverName": { type:String, required:true },
            "receiverMobile": { type:Number, required:true },
            "landmark": { type:String },
            "area": { type:String, required:[true,"Area is required"] },
            "city": { type:String, required:[true,"City is required"] },
            "state": {type:String, required:[true,"State is required"] },
            "pincode": { type:Number, required:[true,"Pincode is required"] },
            "addressType": { type:String, enum:['H','W'] }
            },
        required : true
    },
    "statusTrack":{
        type : [{ "statusCd":{type:Number}, "date":{type:Date} }]
    }
};

const sellersObj = {
    "sellerId":{ type:String, required:true },
    "companyName": {type: String, required: true },
    "sellerPassword": { type: String, required: true },
    "sellerEmail": { type: String, required: true },
    "sellerMobile": { type: Number },
    "products": {
        type: [{ "productId": { type: String, required: true } }],
        default: []
    },
    "address":{
        type:{
            "doorNumber":{ type : String},
            "street":{ type : String, required:true},
            "city" : { type : String , required:true},
            "state":{type : String,required:true},
            "pincode":{ type : Number, required:true}
            },
        default : {}
    }
};

const connection = {};
const customersSchema = new Schema(customersObj, { collection: "Customers", timestamps: true });
const productsSchema = new Schema(productsObj, { collection: "Products", timestamps: true });
const ordersSchema = new Schema(ordersObj, { collection: "Orders", timestamps: true });
const sellersSchema = new Schema(sellersObj, { collection: "Sellers", timestamps: true });

connection.getCollection = collectionName => {
    return mongoose.connect(DB_URL.PRODUCTION, 
    {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
        switch (collectionName){
            case COLLECTION_NAME.CUSTOMERS: return db.model(collectionName, customersSchema);
            case COLLECTION_NAME.PRODUCTS : return db.model(collectionName, productsSchema);
            case COLLECTION_NAME.ORDERS   : return db.model(collectionName, ordersSchema);
            case COLLECTION_NAME.SELLERS  : return db.model(collectionName, sellersSchema);
        }
    }).catch(err => {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    });
}

module.exports = connection;