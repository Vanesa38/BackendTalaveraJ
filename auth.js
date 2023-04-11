export const  authMiddleware = async (req,res,next)=>{
    if(req.session?.user != undefined){
    return next()
    }
    return res.status(401).redirect("/login")
}
export default authMiddleware
