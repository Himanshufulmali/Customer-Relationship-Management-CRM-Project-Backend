const {findAllData} = require("../controllers/userController");
const {verifyJwtToken} = require("../middlewares/userMiddleware");
const {adminRights} = require("../middlewares/userMiddleware");


module.exports = (app) => {
  
    /// route for getting user list ///

    app.get("/crm/api/v1/users",[verifyJwtToken,adminRights],findAllData);

}