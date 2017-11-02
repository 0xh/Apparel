const express =require('express')
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

// Routes request
const size = require('./routes/size')
const cart = require('./routes/cart')
const user = require('./routes/users')
const product = require('./routes/product')
const inventory = require('./routes/inventory')
const shopping_cart = require('./routes/shopping_cart')
const customer_review = require('./routes/customer_review')

var port = process.env.PORT || 8080
var app = express()

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");

app.use('/size', size)
app.use('/user', user)
app.use('/cart', cart)
app.use('/inventory', inventory)
app.use('/shopping_cart', shopping_cart)
app.use('/customer_review', customer_review)
app.use('/', product)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(port)
