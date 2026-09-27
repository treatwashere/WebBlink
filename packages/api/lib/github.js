const {Octokit}=require('@octokit/rest');
function createGitHubClient(token){return new Octokit({auth:token})}
async function getRepository(token,owner,repo){return (await createGitHubClient(token).repos.get({owner,repo})).data}
async function listUserRepos(token){return (await createGitHubClient(token).repos.listForAuthenticatedUser({per_page:100,sort:'updated'})).data}
async function createWebhook(token,owner,repo,siteId){const secret=process.env.GITHUB_WEBHOOK_SECRET;if(!secret)throw new Error('GITHUB_WEBHOOK_SECRET is not configured');return (await createGitHubClient(token).repos.createWebhook({owner,repo,name:'web',config:{url:(process.env.API_URL||'http://localhost:3000')+'/api/webhooks/github/'+siteId,content_type:'json',secret,insecure_ssl:'0'},events:['push','pull_request'],active:true})).data}
async function createDeploymentStatus(token,owner,repo,sha,state,targetUrl,description){return createGitHubClient(token).repos.createCommitStatus({owner,repo,sha,state,target_url:targetUrl,description,context:'WebBlink'})}
module.exports={createGitHubClient,getRepository,listUserRepos,createWebhook,createDeploymentStatus};