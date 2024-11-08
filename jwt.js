const jwt= require('jsonwebtoken');
const secretKey= process.env.JWT_SECRET_KEY;

const jwtauthMiddleware=(req,res,next)=>{

    const authorization= req.headers.authorization;
    if(!authorization){
        return res.status(401).json({message:"unauthorized"});
    }
    const token= authorization.split(' ')[1];

    try {
        const decoded= jwt.verify(token,secretKey);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid Token'});
    }
}

const generateJWT=(userData)=>{
    
    return jwt.sign(userData,secretKey);
}

module.exports={jwtauthMiddleware,generateJWT};