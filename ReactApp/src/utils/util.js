import { getValue } from "../library";

import { getCheckoutItems, getConfirmedAddressId } from "../redux/checkout/checkout.selector";
import { getCustomerAddresses } from "../redux/customer/customer.selector";

export const calculatePriceAfterDiscount = (actualPrice, discount) =>{
    return actualPrice - (actualPrice * (discount/100));
};

export const calculateSavingPrice = (actualPrice, discount) =>{
    return (actualPrice * (discount/100));
};

export const numberToPrice = number => number.toFixed(2);

export const getProductById = (products, productId) =>{
    return products.find( product => getValue(product, 'productId', "") === productId );
};

export const getProductsByType = (products, name, type) =>{
    return products.filter( product => getValue(product, type, "").toLowerCase() === name.toLowerCase() );
};

export const capitalize = ( str ) => str.charAt(0).toUpperCase() + str.slice(1);

/*
@items can be an object or array
@object should be product type
@array 0th element category and 1st element sub category 
*/
export const getBreadcrumSections = (item) =>{
    const sections = [{ id: "homepage", name:"Home", link: '/' }];
    if(getValue(item, 'productId', '')) {
        sections.push({id: item.category, name: capitalize(item.category), link : `/${item.category}`});
        sections.push({id: item.subCategory, name: capitalize(item.subCategory), link : `/${item.category}/${item.subCategory}`});
        sections.push({id: item.productId, name: capitalize(item.productName)});
    }
    else{
        if(item.length === 1){
            sections.push({id: item[0], name: capitalize(item[0])});
        }
        else{
            sections.push({id: item[0], name: capitalize(item[0]), link : `/${item[0]}`});
            sections.push({id: item[1], name: capitalize(item[1])});
        }
    }
    return sections;
};

export const getAddressById = (addresses, id) => addresses.find( address => address._id === id);

export const beforeUnloadListener = (e) => {
    e.preventDefault();
    e.returnValue = "The page that you're looking for used information that you entered. Returning to that page might cause any action you took to be repeated. Do you want to continue?";
};

export const parseQuery = (search) => new URLSearchParams(search);

export const prepareOrderDetails = () =>{
    return{
        checkoutItems: getCheckoutItems().map( item => ({productId: item.productId, quantity : 1})),
        paymentType: "C.O.D",
        deliveryAddress: getAddressById(getCustomerAddresses(), getConfirmedAddressId())
    };
};