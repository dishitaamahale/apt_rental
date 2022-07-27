const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( {path:'config.env'} )
const PORT = 8080;

//log request
app.use(morgan("tiny"));

//MongoDB connection
connectDB();

//parse req to body parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine", "ejs") //html toh html instead of ejs
//app.set('views', path.resolve(__dirname, "views/ejs"));

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
//css/style.css
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});