import { getValue, setValue } from "../library";

import { getCheckoutItems, getConfirmedAddressId } from "../redux/checkout/checkout.selector";
import { getCustomerAddresses } from "../redux/customer/customer.selector";
import { getHomeProducts } from "../redux/product/product.selector";

import APP_CONST from "../APP_CONST";

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

export const mapProductsInOrders = (orders) => { 
    // would be better to include these minor product details in order schema
    const products = getHomeProducts();
    return orders.map( order => {
        const product = getProductById(products, getValue(order, "product.productId", ""));
        setValue(order, "product.productName", product.productName);
        setValue(order, "product.sellerId", product.sellerId);
        setValue(order, "product.productImage", product.productImages[0]);
        return order;
    });
};

export const getCurrentStatus = (statusTrack) =>{
    return APP_CONST.ORDER_STATUS[statusTrack[statusTrack.length-1].statusCd];
};

export const getCurrentStatusDate = (statusTrack) =>{
    return statusTrack[statusTrack.length-1].date;
};

export const getFormattedDate = (unFormattedDate, format) => {
    const newDate = new Date(unFormattedDate);
    const date = newDate.getDate();
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'short'}).format(newDate);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short'}).format(newDate);
    const year = newDate.getFullYear();
   
    switch(format){
       case APP_CONST.DATE_FORMAT.MDtY :  return `${month} ${date}, ${year}`;
       case APP_CONST.DATE_FORMAT.DyDtM :  return `${day}, ${date} ${month}`;
       default :  return `${month} ${date}, ${year}`;
    }
};

export const mapOrderStatusDetails = (statusTrack) => {
    const tracker = statusTrack.map(track => ({
            ...track,
            date: getFormattedDate(track.date, APP_CONST.DATE_FORMAT.DyDtM),
            status: APP_CONST.ORDER_STATUS[track.statusCd]
        })
    );

    for(let cd=tracker[tracker.length-1].statusCd+1; cd<=5; ++cd){
        const expectedDate = new Date(tracker[cd-2].date).getTime();
        const expectedTrack = {
            _id: cd,
            status: APP_CONST.ORDER_STATUS[cd],
            date : cd === 5? `Expected by ${getFormattedDate(expectedDate, APP_CONST.DATE_FORMAT.DyDtM)}`:
                            getFormattedDate(expectedDate+(2*24*60*60*1000), APP_CONST.DATE_FORMAT.DyDtM)
        }
        tracker.push(expectedTrack);
    }
    // Packed '@index 1' and Out for Delivery '@index 3' are mutually exclusive
    const removeIndex = statusTrack.length <= 3? 3: 1; 
    return tracker.filter((track, index) => index !== removeIndex);
};

export const sortByCreatedAt = ( orders ) => ( 
    orders.sort( (a, b) => (new Date(b.createdAt) - new Date(a.createdAt)) )
);