export const validateEmail = (email) => {
    const emailReg = /^[a-z, A-Z]\w{2,}@[a-z,A-Z]{2,}.com$/;
    return emailReg.test(email)?"":"Please enter valid Email ID";
}

export const validateMobileNumber = (mobileNo) => {
    const mobileNoReg = /^[6-9]\d{9}$/; //indian 10 digit number
    return mobileNoReg.test(mobileNo)?"":"Please enter valid Mobile number";
}

export const validateUsername = (username) => {
    const usernameReg = /^[a-z,A-Z]+$/;
    return usernameReg.test(username)?"":"Username should contains alphabets";
}

export const validateUserId = (userId) =>{
    if(validateMobileNumber(userId) && validateEmail(userId)) {
        return "Please enter valid Email ID/Mobile number";
    }
    return "";
}

export const validatePassword = (password) => {
    if(password.length === 0){
         return "Please enter Password";
    }
    else{
        return password.length >=6? "": "Password must be at least 6 characters";
    }
}
