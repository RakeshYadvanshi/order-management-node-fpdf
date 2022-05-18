/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/
const db = require("../models");
const fs = require("fs");
const FPDF = require('node-fpdf')
const { strtoupper, substr, count } = require('node-fpdf/src/PHP_CoreFunctions')

module.exports = {
    Get: {
        EmployeeAddOrder: async (req, res) => {

            var countries = await db.Country.findAll()
            var provinces = await db.Province.findAll()
            var cities = await db.City.findAll()
            var postalCodes = await db.PostalCode.findAll()
            var pizzaToppings = await db.PizzaToppings.findAll()

            res.render("employee-add-order", {
                countries,
                provinces,
                cities,
                postalCodes,
                pizzaToppings,
                status: "", ConfirmPasswordError: false, errors: []
            });
        },
        EmployeeViewOrders: async (req, res) => {
            await db.Order.findAll({
                where: { status: 'Pending' },
                include: [{
                    distinct: true,
                    model: db.User,
                    where: { user_type: 'customer' },
                    include: {
                        model: db.Address,
                        include: [{
                            model: db.PostalCode,
                            include: [{
                                model: db.City,
                                include: [{
                                    model: db.Province,
                                    include: [db.Country]
                                }]
                            }]
                        }]
                    }
                }]
            })
                .then(function (orders) {
                    res.render("employee-view-orders", { orders });
                })
                .catch(function (er) {
                    console.log(er);
                })


        },
        GetOrderDetail: async (req, res) => {
            await db.Order.findAll({
                where: { id: req.params.orderId },
                include: [{
                    distinct: true,
                    model: db.User,
                    where: { user_type: 'customer' },
                    include: {
                        model: db.Address,
                        include: [{
                            model: db.PostalCode,
                            include: [{
                                model: db.City,
                                include: [{
                                    model: db.Province,
                                    include: [db.Country]
                                }]
                            }]
                        }]
                    }
                }]
            })
                .then(function (orders) {
                    res.render("order-detail", { order: orders[0] });
                })
                .catch(function (er) {
                    console.log(er);
                })


        },
        UpdateOrderStatus: async function (req, res) {
            db.Order.update({ status: req.params.orderStatus }, {
                where: { id: req.params.orderId }
            }).then(function () {
                res.redirect("/order-detail/" + req.params.orderId)
            })
        },
        DownloadOrderPdf: async (req, res) => {

            await db.Order.findAll({
                where: { id: req.params.orderId },
                include: [{
                    distinct: true,
                    model: db.User,
                    where: { user_type: 'customer' },
                    include: [{
                        model: db.Address,
                        include: [{
                            model: db.PostalCode,
                            include: [{
                                model: db.City,
                                include: [{
                                    model: db.Province,
                                    include: [db.Country]
                                }]
                            }]
                        }]
                    }]
                }, {
                    model: db.Pizza,
                    include: [{
                        model: db.PizzaToppings
                    }]
                }]
            })
                .then(function (orders) {
                    let order = orders[0];
                    let textypos = 5;
                    let cPdfName = `${__dirname}/Receipt.pdf`
                    const pdf = new FPDF('P', 'mm', [48, 100]);

                    pdf.AddPage()
                    pdf.SetFont('Times', 'B', 8)
                    pdf.SetY(2)
                    pdf.SetX(2)
                    pdf.Cell(5, textypos, "Popular Pizza Store")

                    pdf.SetFont('Arial', '', 5);
                    pdf.SetX(2)
                    textypos += 7
                    pdf.Cell(5, textypos, 'Order : ' + order.id)

                    pdf.SetX(2)
                    textypos += 7
                    pdf.Cell(5, textypos , 'Hello ' + order.customer.first_name + " " + order.customer.last_name)

                    pdf.SetX(2)
                    textypos += 7
                    pdf.Cell(5, textypos, 'No.   Piza Name            Item Price        TOTAL')

                    let total = 0
                    let off = textypos + 7;
                    let products = [

                    ]
                    for (let index = 0; index < order.pizzas.length; index++) {
                        const element = order.pizzas[index];
                        products.push({ "q": 1, "name": element.pizza_name + " " + element.pizza_type + " " + element.pizza_size, "price": 10 });
                        for (let topi = 0; topi < element.pizza_toppings.length; topi++) {
                            const toping = element.pizza_toppings[topi];
                            products.push({ "q": 1, "name": toping.topping, "price": 1 });
                        }


                    }

                    products.forEach(pro => {

                        pdf.SetX(2)
                        pdf.Cell(5, off, pro["q"])
                        pdf.SetX(6)
                        pdf.Cell(35, off, strtoupper(substr(pro["name"], 0, 12)))
                        pdf.SetX(20)
                        pdf.Cell(11, off, `$${pro["price"].toFixed(2)}`, 0, 0, "R")
                        pdf.SetX(32);
                        pdf.Cell(11, off, "$ " + (pro["q"] * pro["price"]).toFixed(2), 0, 0, "R")

                        total += pro["q"] * pro["price"];
                        off += 6;

                    })

                    textypos = off + 6
                    pdf.SetX(2)
                    pdf.Cell(5, textypos, "TOTAL: ")
                    pdf.SetX(38)
                    pdf.Cell(5, textypos, "$ " + total.toFixed(2), 0, 0, "R")

                    pdf.SetX(2)
                    pdf.Cell(5, textypos + 6, 'Thanks for visiting. Visit Again')
                    pdf.Output('f', cPdfName)
                    var file = fs.createReadStream(cPdfName);
                    var stat = fs.statSync(cPdfName);
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=Receipt.pdf');
                    file.pipe(res);
                })
                .catch(function (er) {
                    console.log(er);
                })




        }
    },
    Post: {
        PlaceNewOrder: async (req, res) => {
            var userObj = {
                first_name: req.body.FirstName,
                last_name: req.body.LastName,
                phone_no: req.body.ContactNumber,
                email: req.body.Email,
                user_type: 'customer'
            }
            var dbUsers = await db.User.findAll({ where: { email: userObj.email } })
            var dbUserId = 0;
            if (dbUsers.length == 0) {
                var dbUser = await db.User.create(userObj);
                dbUserId = dbUser.id;
            } else {
                dbUserId = dbUsers[0].id;
            }



            let addressObj = {
                street_num: req.body.HouseNo,
                street_name: req.body.Street,
                postalcodeId: req.body.PostalCode,
                customerId: dbUserId
            }


            // Save address in the database
            db.Address.create(addressObj).then(function (ob) {
                db.Order.create({
                    order_date_time: (new Date()).toISOString(),
                    order_description: req.body.Comment,
                    customerId: dbUserId
                }).then(function (order) {
                    db.Pizza.create({
                        pizza_name: req.body.PizzaName,
                        pizza_type: req.body.PizzaType,
                        pizza_size: req.body.PizzaSize,
                        orderId: order.id
                    }).then(async function (pizza) {
                        for (let index = 0; index < req.body.PizzaTopping.length; index++) {
                            const element = req.body.PizzaTopping[index];
                            await db.PizzaHasToppings.create({
                                pizza_toppingsId: req.body.PizzaTopping[index],
                                pizzaId: pizza.id
                            }).catch(function (er) {
                                console.log(er);
                            });
                            res.redirect("employee-view-orders")
                        }

                    }).catch(function (er) {
                        console.log(er);
                    });
                }).catch(function (er) {
                    console.log(er);
                });


            }).catch(function (er) {
                console.log(er);
            });







        },

    }
}