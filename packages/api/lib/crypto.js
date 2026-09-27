const crypto=require('crypto');
function key(){return crypto.createHash('sha256').update(process.env.JWT_SECRET||'development-only-secret').digest()}
function encrypt(value){const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',key(),iv);const encrypted=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);return [iv.toString('base64'),cipher.getAuthTag().toString('base64'),encrypted.toString('base64')].join('.')}
function decrypt(payload){const [iv,tag,data]=payload.split('.');const decipher=crypto.createDecipheriv('aes-256-gcm',key(),Buffer.from(iv,'base64'));decipher.setAuthTag(Buffer.from(tag,'base64'));return Buffer.concat([decipher.update(Buffer.from(data,'base64')),decipher.final()]).toString('utf8')}
module.exports={encrypt,decrypt};