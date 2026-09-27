const {withSession}=require('../lib/auth');
function withAuth(handler){return async(req,res)=>{const user=await withSession(req,res);if(!user)return res.status(401).json({error:'Authentication required'});req.user=user;return handler(req,res)}}
module.exports={withAuth};