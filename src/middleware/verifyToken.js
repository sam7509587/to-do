const { ApiError, SERCRET_KEY, client } = require("../config")
const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new ApiError(400, "token is required"))
    }
    jwt.verify(token, SERCRET_KEY, (err, result) => {
        if (err) {
            return next(new ApiError(400, "authencation failed"))
        }
        const id = result.id
        client.query(`SELECT * FROM todouser WHERE id = '${id}'`, (err, res) => {
            if (err) {
                return next(new ApiError(400, "authencation failed"))
            }
            if (res.rows.length === 0) {
                return next(new ApiError(400, "no user found "))
            }
            else {
                req.user = res.rows[0];
                next()
            }
        })
    })
}
