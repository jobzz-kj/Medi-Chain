var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require('web3');
var fileUpload = require("express-fileupload");
var hbs = require('hbs');

var supplychain = require(path.join(__dirname, 'build/contracts/Supplychain.json'));
web3 = new Web3("http://localhost:8545");

//-- Edit Start Here ---

coinbase = "0x85d74C91E8313a8FD0D57F11d0c8BD6a1DB0c799";
web3.eth.getAccounts()
    .then((accounts) => {
        coinbase = accounts[0];
        console.log(coinbase)
    });
contractAddress = supplychain.networks['5777'].address;
var contractAbi = supplychain.abi;

message = new web3.eth.Contract(contractAbi, contractAddress);

hbs.registerHelper("equals", function(string1, string2, options) {
    if (string1 === string2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
