const {signup} = require("../controllers/authController");
const {signin} = require("../controllers/authController");
const {signupValidation} = require("../middlewares/authMiddleware");
const {signinValidation} = require("../middlewares/authMiddleware");


module.exports = (app) => {
    /// creating signup route ///

    app.post("/crm/api/v1/users/signup",[signupValidation],signup);

    /// creating signup route ///
    
    app.post("/crm/api/v1/users/signin",[signinValidation],signin);
}