const crypto=require('crypto'); const {SignJWT,jwtVerify}=require('jose'); const {get,set,del}=require('./redis');
const secret=()=>new TextEncoder().encode(process.env.JWT_SECRET||'development-only-secret-change-me');
async function createToken(userId){return new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime(process.env.JWT_EXPIRY||'7d').sign(secret())}
async function verifyToken(token){try{return (await jwtVerify(token,secret())).payload}catch{return null}}
function cookie(token,maxAge=604800){return 'token='+token+'; HttpOnly; '+(process.env.NODE_ENV==='production'?'Secure; ':'')+'SameSite=Lax; Path=/; Max-Age='+maxAge}
async function withSession(req,res){const raw=(req.headers.authorization||'').replace(/^Bearer\s+/i,'')||req.cookies?.token;const payload=raw&&await verifyToken(raw);if(!payload?.sub)return null;req.user={userId:payload.sub};return req.user}
function randomState(){return crypto.randomBytes(32).toString('hex')}
async function saveOAuthState(state,data){await set('oauth:'+state,JSON.stringify(data),600)}
async function consumeOAuthState(state){const raw=await get('oauth:'+state);if(raw) await del('oauth:'+state);return raw?JSON.parse(raw):null}
module.exports={createToken,verifyToken,cookie,withSession,randomState,saveOAuthState,consumeOAuthState};