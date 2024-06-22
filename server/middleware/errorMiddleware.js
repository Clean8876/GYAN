export const notFound = (res,req,next) => {
    const error = new Error(`NOT FOund ${req.orginalUrl}`);
    res.status(404);
    next(error)
    }
    
    export const errorHandler = (err,req,res,next)=>{
        const setcode = res.setcode === 200 ? 500 : res.setcode;
        res.status(setcode)
        res.json({
            message: err.message,
            stack:process.env.NODE_ENV === 'production'? null:err.stack
        });
    
    }