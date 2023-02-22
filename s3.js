const AWS = require('aws-sdk');
const { request, response } = require('express');
const s3 = new AWS.S3();

const fs = require('fs');
const s3uploadfun = (request,respond) =>{
const fileStream = fs.createReadStream(request.file.path);

const params = {
  Bucket: 'cloudydays-project1-s3bucket-input',
  Key: request.file.originalname,
  Body: fileStream,
};

Response =  s3.upload(params).promise();

}
exports.s3uploadfun=s3uploadfun;