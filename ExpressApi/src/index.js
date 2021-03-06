const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require("cors");

const userAccountRouter = require("./routes/userAccount.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");

const requestLogger = require("./utilites/requestLogger");
const errorLogger = require("./utilites/errorLogger");
const app = express();

app.use(cors());

app.use(requestLogger);
app.use(bodyParser.json());
app.use('/account',userAccountRouter);
app.use('/products',productRouter);
app.use('/order',orderRouter);
app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));