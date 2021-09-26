const COLLECTION_NAME = {
    PRODUCTS:"Products",
    CUSTOMERS:"Customers",
    ORDERS:"Orders",
    SELLERS:"Sellers"
};

const ID_PREFIX = {
    CUSTOMER:"CU",
    ORDER:"OR"
}

const JWT_KEY = {
    SECRET:"KART_SECRET"
}

const DB_URL = {
    LOCAL:"mongodb://localhost:27017/UkartShoppingDB",
    PRODUCTION:"mongodb+srv://erudayuorg:TUvu90erudayuorg@ukartdb.1u82g.mongodb.net/UkartDB?retryWrites=true&w=majority"
}

module.exports = {COLLECTION_NAME, ID_PREFIX, JWT_KEY, DB_URL};