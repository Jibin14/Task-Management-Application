const jwt = require('jsonwebtoken');
exports.userAuthentication = (req,res,next)=>{
    try {
        const {tocken} = req.cookies;
        if(!tocken){
            return res.status(401).json({
            success: false,
            message: "tocken not found",
        });
        }
        const decode = jwt.verify(tocken,process.env.JWT_SECRET_KEY);

        const {userId,role} = decode;
        // console.log('decode',decode);
        
        req.userId = userId;
        req.userRole = role;
        next();

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}