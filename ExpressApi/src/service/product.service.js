const productsModel = require('../model/products.model');
const { ApiError } = require('../objectCreator/objectCreator');

const productService ={};

//remove this api in PROD once Seller app created
productService.insertScript = () => {
    return productsModel.deleteAllProducts()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No products deleted", 404);
            return;
        })
        .then(() => productsModel.insertSampleProducts())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert Products",500);
        })
}

productService.getAllProducts = () => {
    return productsModel.getAllProducts()
        .then(response => {
            if(response.length > 0) return response;
            throw new ApiError("No products found", 404);
        })
}

productService.getProductById = productId => {
    return productsModel.getProductById(productId)
        .then(response => {
            if(response) return response;
            throw new ApiError("product not found", 404);
        });
}

productService.deleteProductById = productId => {
    return productsModel.deleteProductById(productId)
        .then(response => {
            if(response.deletedCount === 0) throw new ApiError("Product not found", 404);
            return "Product deleted";
        });
}

module.exports = productService;
