const {ID_PREFIX} = require('../keys/constant');

const generateId = ( prefix, count) =>{
    switch(prefix){
        case ID_PREFIX.CUSTOMER: return ID_PREFIX.CUSTOMER+(30000+count);
        case ID_PREFIX.ORDER: return ID_PREFIX.ORDER+(50000+count);
    }
}
const getPriceAfterDiscount = (price, discount) => price - (price * (discount/100));

module.exports = {generateId, getPriceAfterDiscount};