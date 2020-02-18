const express = require('express');
const cors = require("cors");
const router = require("./routes/routing");
const requestLogger = require("./utilites/requestLogger");
const errorLogger = require("./utilites/errorLogger");
const app = express();

app.use(cors());

app.use(requestLogger);
app.use('/customer',router);
app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));