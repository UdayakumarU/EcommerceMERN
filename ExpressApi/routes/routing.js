const express = require('express')
const router = express.Router();

let data = [
    {
      "productId": 1001,
      "productName": "Yellow Jersey",
      "category":"clothings",
      "subCategory":"unisex",
      "productActualPrice": 499,
      "discount": 10,
      "productQuantity":10,
      "description":"Made for training and matches. Our football designers developed the F500 football shirt to wear for playing up to three times a week. We designed this durable F500 football jersey with very good freedom of movement to make it easier for you to run and do your favourite moves on the pitch.",
      "highlights":["Fit Type: Regular Fit",
                    "size - Small (36) , medium (38) , Large (40), X-large (42) (in inches)",
                    "Fit Type: Regular Fit",
                    "This Jersey is made with breathable, sweat-wicking fabric to help keep you cool,dry and comfortable.",
                    "football specific fit for first class comfort",
                    "Strategically placed hard wearing fabric at the side leg for dynamic slides."
                  ],
      "rating":4.1,
      "productImage":
        "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
    },
    {
      "productId": 1002,
      "productName": "Apple Watch",
      "category":"Electronics",
      "subCategory":"watch",
      "productActualPrice": 33499,
      "discount": 10,
      "productQuantity":10,
      "description":"Apple Watch is a wearable smartwatch that allows users to accomplish a variety of tasks, including making phone calls, sending text messages and reading email.The Apple Watch iPhone app allows users to change settings, rearrange apps, choose notifications and download new apps from their iPhone. The Apple Watch interface was designed specifically for the wrist, and navigation relies on swiping and tapping",
      "highlights":["GPS",
                    "Optical heart sensor",
                    "Swimproof",
                    "Digital Crown",
                    "S3 with dual-core processor",
                    "Accelerometer and gyroscope",
                    "Customer care: 1-800-692-7753",
                    "watchOS 5", 
                    "Aluminium case"
                  ],
      "rating":4.4,
      "productImage":
        "https://www.nyasa.info/wp-content/uploads/2019/09/APPLE_1-2-600x600.jpg"
    },
    {
      "productId": 1003,
      "productName": "Fashion Red shoes",
      "category":"footwear",
      "subCategory":"casual shoes",
      "productActualPrice": 1499,
      "discount": 10,
      "productQuantity":10,
      "description":"A shoe is an item of footwear intended to protect and comfort the human foot. Shoes are also used as an item of decoration and fashion. The design of shoes has varied enormously through time and from culture to culture, with appearance originally being tied to function",
      "highlights":["Material Type: Synthetic",
                    "Lifestyle: Sports",
                    "Closure Type: Lace-Up",
                    "Warranty Type: Manufacturer",
                    "Product warranty against manufacturing defects: 90 days",
                    "Care Instructions: Allow your pair of shoes to air and de-odorize at regular basis; use shoe bags to prevent any stains or mildew; dust any dry dirt from the surface using a clean cloth; do not use polish or shiner"
                  ],
      "rating":4.2,
      "productImage":
        "https://shoesclub.pk/wp-content/uploads/2019/09/FASION-RED-B-600x600.jpg"
    },
    {
      "productId": 1004,
      "productName": "American Tourister Bag",
      "category":"Bags",
      "subCategory":"backpacks",
      "productActualPrice": 1699,
      "discount": 10,
      "productQuantity":10,
      "description":"The American Tourister Keystone Laptop Backpack is made from durable polyester fabric and features a medium sized shape with a dedicated 15.6 laptop sleeve and a separate sleeve to hold your iPad or tablet. Accented with custom logo hardware and zipper pulls, this travel backpack features a dual compartment design plus a vertical front zipper pocket and a separate front organizer compartment with slip pockets to hold all sorts of small accessories. Choose from a variety of color combinations and allover prints to suit your personal sense of style.",
      "highlights":["Laptop Compatibility: Yes",
                    "Strap Type: Adjustable",
                    "Outer Material: Polyester",
                    "Color: Blue",
                    "Water Resistance: Water resistant",
                    "Capacity: 32 liters",
                    "Dimensions: 32.5 cms x 18 cms x 50 cms (LxWxH)",
                    "Number of compartments: 3"
                  ],
      "rating":4.3,
      "productImage":
        "https://shopsbazaar.com/wp-content/uploads/2019/08/618ZNI86PgL._SL1100_-600x600.jpg"
    }
  ]
  
router.get('/products', (req,res,next)=>{
    res.send(data);
});

router.get('/products/:productId', (req,res,next)=>{
    const product = data.find( product => req.params.productId == product.productId)
    if(product){
      res.send(product);
    }
    else{
        let err = new Error();
        err.status = 404;
        err.message = "You don't have this Product";
        next(err);
    }
});

module.exports = router;