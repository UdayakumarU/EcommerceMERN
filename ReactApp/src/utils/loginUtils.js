export const validateUserId = (userId) =>{
    const phoneNoReg = /^[6-9]\d{9}$/; //indian 10 digit number
    const emailReg = /^[a-z, A-Z]\w{2,}@[a-z,A-Z]{2,}.com$/; 
    if(phoneNoReg.test(userId) || emailReg.test(userId)) {
        return "";
    }
    return "Please enter valid Email ID/Mobile number";
}

export const validatePassword = (password) => password? "": "Please enter Password";
