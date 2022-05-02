const { ApiError, SERCRET_KEY } = require("../config");
const client = require("../config/db")
const jwt = require("jsonwebtoken")
exports.signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const data = await client.query(`SELECT * FROM todouser WHERE email ='${email}'`);
        if (data.rows.length != 0) {
            return next(new ApiError(409, "email already present"))
        }
        const savedData = await client.query(`INSERT INTO todouser (email,password)VALUES('${email}','${password}') RETURNING *`)
        res.status(201).json({
            statusCode: 201, message: "signup successfull", data: savedData
        })
    } catch (err) {
        res.status(400).json({ statusCode: 400, message: err.message })
    }
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email, !password) {
            return next(new ApiError(409, "email and password field are not given "))
        }
        const data = await client.query(`SELECT * FROM todouser WHERE email ='${email}'`);
        if (data.rows.length === 0) {
            return next(new ApiError(409, "not a user"))
        }
        const loginDetails = await client.query(`SELECT * FROM todouser WHERE email ='${email}' AND password='${password}'`);
        if (loginDetails.rows.length === 0) {
            return next(new ApiError(409, "invalid email or password"))
        }
        const token = await jwt.sign({ id: data.rows.id }, SERCRET_KEY)
        return res.status(200).json({
            statusCode: 200, message: "login successfull",token
        })
    } catch (err) {
        return next(new ApiError(400, err.message))
    }
}
