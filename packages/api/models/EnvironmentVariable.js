const {query}=require('../db'); const {encrypt,decrypt}=require('../lib/crypto');
async function listEnv(siteId){return (await query('SELECT id,key,created_at,updated_at FROM env_variables WHERE site_id=$1 ORDER BY key',[siteId])).rows}
async function getEnv(siteId,key){const r=await query('SELECT encrypted_value FROM env_variables WHERE site_id=$1 AND key=$2',[siteId,key]);return r.rows[0]?decrypt(r.rows[0].encrypted_value):null}
async function setEnv(siteId,key,value){return (await query('INSERT INTO env_variables(site_id,key,encrypted_value) VALUES($1,$2,$3) ON CONFLICT(site_id,key) DO UPDATE SET encrypted_value=EXCLUDED.encrypted_value,updated_at=NOW() RETURNING id,key,created_at,updated_at',[siteId,key,encrypt(value)])).rows[0]}
async function deleteEnv(siteId,key){return (await query('DELETE FROM env_variables WHERE site_id=$1 AND key=$2',[siteId,key])).rowCount>0}
module.exports={listEnv,getEnv,setEnv,deleteEnv};