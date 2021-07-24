import { getValue } from "./modelutils"

export const isCartHasThisItem = (cartitem, newItem) => {
    return cartitem.some(item => getValue(item, 'productId', "") === getValue(newItem, 'productId', false));
}