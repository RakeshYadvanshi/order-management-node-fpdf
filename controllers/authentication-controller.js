/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/


const db  = require("../models");

const PrepareSession = (req, user) => {
    req.session.UId = user.id;
    req.session.UserType = user.user_type;
}
module.exports = {
    Get: {
        Login: async (req, res) => {
            res.render("login", { status: "", ConfirmPasswordError: false, errors: [] });
        },
        Register: async (req, res) => {
            res.render("login", { status: "", ConfirmPasswordError: false, errors: [] });
        },
        Logout: async (req, res) => {
            req.session.destroy(() => {
                res.redirect("/login");
            })
        }
    },
    Post: {
        Register: async (req, res) => {
            if (req.body.Password == req.body.ConfirmPassword) {

                var userObj = {
                    UserName: req.body.UserName,
                    UserType: req.body.UserType,
                    Password: req.body.Password,
                    Email: req.body.Email
                }
                User.create(userObj, (___er, user) => {
                    if (___er == null) {
                        PrepareSession(req, user);
                        res.render("login", { status: "UserCreated", errors: [] });
                    }
                    else {
                        res.render("login", { status: "validationError", errors: ___er });
                    }

                });

            } else {
                res.render("login", { ...req.body, status: "validationError", errors: ["Password and Confirm Password does not match."] });
            }


        },
        Login: async (req, res) => {
            let searchopt = {};
            if (req.body.LoginUserName)
                searchopt.UserName = req.body.LoginUserName.toLowerCase();


            var condition = { email: searchopt.UserName, password: req.body.LoginPassword } ;


            db.User.findAll({ where: condition })
                .then(data => {
                    if (data.length >0){
                        user = data[0]
                        PrepareSession(req, user);
                        let redirectionPage = "404";
                        if (user.user_type == "employee") {
                            redirectionPage = "dashboard";
                        }
                     
                        res.redirect(redirectionPage);
                    }else{
                        res.render("login",
                            {
                                "status": "InvalidCredentials"
                            }
                        );
                    }
                })
                .catch(err => {
                    res.render("login",
                        {
                            "status": "InvalidCredentials"
                        }
                    );
                });
        }
    }
}