/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Yajuvendra
module.exports.UserLoginValidation = (req, res, next) => {
    if (IsUserLoggedIn) {
        next();
    } else {
        res.redirect("/login");
    }

}
module.exports.employeeUserTypeValidation = (req, res, next) => {
    if (IsUserLoggedIn && LoginedUserType == "employee") {
        next();
    } else {
        res.redirect("/login");
    }

}