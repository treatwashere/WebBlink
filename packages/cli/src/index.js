#!/usr/bin/env node
const {Command}=require('commander'); const fs=require('fs'); const path=require('path');
const program=new Command(); const API=process.env.WEBBLINK_API||'http://localhost:3000'; const dir=path.join(process.env.HOME||process.env.USERPROFILE,'.webblink'); const tokenPath=path.join(dir,'token');
function token(){return fs.existsSync(tokenPath)?fs.readFileSync(tokenPath,'utf8').trim():null}
async function request(method,url,body){const t=token();if(!t)throw new Error('Not authenticated. Run: webblink login');const r=await fetch(API+url,{method,headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const d=await r.json();if(!r.ok)throw new Error(d.error||'Request failed');return d}
program.name('webblink').description('WebBlink CLI').version('1.0.0');
program.command('login').description('Authenticate').action(()=>console.log('Open '+API+'/api/auth/github in a browser to sign in.'));
program.command('logout').action(()=>{if(fs.existsSync(tokenPath))fs.unlinkSync(tokenPath);console.log('Logged out')});
program.command('sites').action(async()=>console.log(JSON.stringify(await request('GET','/api/sites'),null,2)));
program.command('deploy').requiredOption('--site <id>').action(async o=>console.log(JSON.stringify(await request('POST','/api/sites/'+o.site+'/deploy'),null,2)));
program.command('logs').requiredOption('--site <id>').action(async o=>console.log(JSON.stringify(await request('GET','/api/sites/'+o.site+'/logs'),null,2)));
program.command('status').requiredOption('--deployment <id>').action(async o=>console.log(JSON.stringify(await request('GET','/api/deployments/'+o.deployment),null,2)));
program.parseAsync(process.argv);