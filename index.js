/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

// code by Rakesh Kumar
const express = require('express')
const bodyParser = require('body-parser')
const authenticationController = require('./controllers/authentication-controller');

const dashboardController = require('./controllers/dashboard-controller');

const  orderController= require('./controllers/order-controller');

const sessionSetup = require('./middlewares/session-setup');
const expressSesssion = require('express-session')


const app = express();
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const settings = require('./settings');
const {
    employeeUserTypeValidation
} = require('./middlewares/authentication')



const db = require("./models");

db.sequelize.sync();


global.IsUserLoggedIn = null;
global.LoginedUserType = null;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSesssion({ secret: settings.SessionSecret, cookie: { maxAge: 1000 * 60 * 60 } }));
app.use("*", sessionSetup);

app.get('/', authenticationController.Get.Login);
app.get('/login', authenticationController.Get.Login);
app.post('/login', authenticationController.Post.Login);
app.get('/register', authenticationController.Get.Register);
app.post('/register', authenticationController.Post.Register);
app.get('/logout', authenticationController.Get.Logout);
app.get('/dashboard', employeeUserTypeValidation, dashboardController.Get.Dashboard)
app.get('/download-order-pdf/:orderId', employeeUserTypeValidation, orderController.Get.DownloadOrderPdf);

app.get('/employee-add-order', employeeUserTypeValidation, orderController.Get.EmployeeAddOrder);
app.get('/employee-view-orders', employeeUserTypeValidation, orderController.Get.EmployeeViewOrders)
app.get('/order-detail/:orderId', employeeUserTypeValidation, orderController.Get.GetOrderDetail)
app.get('/update-order-status/:orderId/:orderStatus', employeeUserTypeValidation, orderController.Get.UpdateOrderStatus)

app.post('/place-new-order', employeeUserTypeValidation, orderController.Post.PlaceNewOrder);

app.use(express.static('public'))
app.get('*', (req, res) => {
    res.render("404");
});
app.listen(8004, () => {
    console.log("App listening on port 8004")
})


