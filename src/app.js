const express = require("express");
const app = express();
const {PORT} = require("./config");
const { userRoute,todoRoute} = require("./routes");
const {errorHnadler} = require("./config")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
require("./config/db")
app.use("/api/user",userRoute)
app.use("/api/todo",todoRoute)
app.use(errorHnadler)
app.listen(PORT,()=>{
    console.log(`listening to port http://127.0.0.1:${PORT}`)
})
