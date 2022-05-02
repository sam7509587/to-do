require("dotenv").config()
const  {errorHnadler}=require("./errorhandler")
module.exports={
    PORT : process.env.PORT,
    client : require("./db"),
    ApiError: require("./apierror"),
    SERCRET_KEY:process.env.SERCRET_KEY,
   errorHnadler
}
