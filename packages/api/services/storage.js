const {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand}=require('@aws-sdk/client-s3');
const client=new S3Client({region:process.env.S3_REGION||'auto',endpoint:process.env.S3_ENDPOINT||undefined,credentials:process.env.S3_ACCESS_KEY_ID?{accessKeyId:process.env.S3_ACCESS_KEY_ID,secretAccessKey:process.env.S3_SECRET_ACCESS_KEY}:undefined});
async function uploadArtifact(key,body,contentType='application/octet-stream'){await client.send(new PutObjectCommand({Bucket:process.env.S3_BUCKET,Key:key,Body:body,ContentType:contentType}));return key}
async function downloadArtifact(key){return client.send(new GetObjectCommand({Bucket:process.env.S3_BUCKET,Key:key}))}
async function deleteArtifact(key){await client.send(new DeleteObjectCommand({Bucket:process.env.S3_BUCKET,Key:key}))}
module.exports={uploadArtifact,downloadArtifact,deleteArtifact};