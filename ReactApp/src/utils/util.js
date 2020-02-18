export const calculatePrice = (actualPrice,discount) =>{
    let price = actualPrice - (actualPrice * (discount/100));
    return price.toFixed(2);
}
export const calculateYouSave = (actualPrice,discount) =>{
    let price = (actualPrice * (discount/100));
    return price.toFixed(2);
}