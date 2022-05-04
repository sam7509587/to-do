const ApiError = require("./apierror");

exports.errorHnadler=(err,req,res,next)=>{
  if(err instanceof ApiError){
    return res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    statusCode:500,
    message:"something went wrong",
  });
  
}
