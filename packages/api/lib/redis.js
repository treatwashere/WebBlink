const Redis=require('ioredis'); let redis=null;
function getRedis(){if(!redis&&process.env.REDIS_URL) redis=new Redis(process.env.REDIS_URL,{maxRetriesPerRequest:2});return redis}
async function get(key){const r=getRedis();return r?r.get(key):null}
async function set(key,value,seconds){const r=getRedis();if(r) return r.set(key,value,'EX',seconds);return null}
async function del(key){const r=getRedis();if(r) return r.del(key);return null}
module.exports={getRedis,get,set,del};