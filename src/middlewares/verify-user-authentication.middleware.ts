import {Response, Request, NextFunction} from "express"
import jwt from "jsonwebtoken"

export async function verifyUserAuthenticationMiddleware(req: Request, res:Response, next:NextFunction){
    const authorization = req.headers.authorization

    if(!authorization){
        return res.status(400).json({
            message: "missing authorization token."
        })
    }
    
    const token = authorization.split(" ")[1];
    
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) =>{
        if(error){
            return res.status(403).json({
                message: 'Invalid token'
            })
        }

        if(decoded){
            const idUserAuthenticated = decoded.user.id
            req.idToken = idUserAuthenticated
        }
        
        return next()
    })
}