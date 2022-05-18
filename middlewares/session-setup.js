/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

// code by Rakesh Kumar
module.exports =(req,res,next)=>{
    IsUserLoggedIn = req.session.UId;
    LoginedUserType = req.session.UserType;
    next();
}