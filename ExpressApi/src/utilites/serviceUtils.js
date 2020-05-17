const {ID_PREFIX} = require('../keys/constant');
const generateId = ( prefix, count) =>{
    switch(prefix){
        case ID_PREFIX.CUSTOMER: return ID_PREFIX.CUSTOMER+(30000+count);
    }
}

module.exports = {generateId};