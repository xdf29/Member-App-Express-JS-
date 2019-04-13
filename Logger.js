const moment = require("moment")
//Middleware allow me to access req and res
const logger = (req, res, next) => {
    console.log(req.protocol + "://" + req.get("host") + req.originalUrl + " : " + moment().format())
    next()
}

module.exports = logger