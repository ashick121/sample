const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var useragent = require('express-useragent');



let app = express();


//ROUTE FILES REQUIRING
var user = require('./userRoute');




//BODYPARSER
app.use(bodyParser.urlencoded({
    extended: true, limit: '150mb'
}));
app.use(bodyParser.json({ limit: '150mb' }));

//DATABASE URL
mongoose.connect(process.env.MONGOURL || 'mongodb+srv://sebinthomas2025:sebinsebin@cluster0.twto8fl.mongodb.net/?retryWrites=true&w=majority', ).then(() => { 
    console.log("Data Base connect aayiiiiiiiiiiiiiiiiiiiiiiiiiiii")
}).catch((ex) => {
    console.log("Db connection error")
    console.log(ex)
});

//database connection
var db = mongoose.connection;



//Port Declaration
var port = process.env.PORT || 4000;

//Cors 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//Cors and helmet use
app.use(cors());

//Consoles the user information and API calls into the server Environment
app.use(useragent.express());
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
})

//APP.USE FUNCTIONS



//Route for checking the server health
app.get('/health', async(req, res) => {
    res.status(200).json({
        status: true
    });
    return
});

//Server Environment set up
const server = app.listen(port, function () {
    console.log("Running Server on port " + port);
});

app.use(user);