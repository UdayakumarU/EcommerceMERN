const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    let data = [
        {
          "productId": 1001,
          "productName": "Yellow Jersey",
          "productActualPrice": 499,
          "discount": 10,
          "productImage":
            "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
        },
        {
          "productId": 1001,
          "productName": "Yellow Jersey",
          "productActualPrice": 499,
          "discount": 10,
          "productImage":
            "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
        },
        {
          "productId": 1001,
          "productName": "Yellow Jersey",
          "productActualPrice": 499,
          "discount": 10,
          "productImage":
            "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
        },
        {
          "productId": 1001,
          "productName": "Yellow Jersey",
          "productActualPrice": 499,
          "discount": 10,
          "productImage":
            "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
        }
      ]
    res.send(data);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));