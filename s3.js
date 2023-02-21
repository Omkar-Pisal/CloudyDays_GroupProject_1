const AWS = require('aws-sdk');
const { request, response } = require('express');
const s3 = new AWS.S3();

const fs = require('fs');
const s3uploadfun = (request,response) =>{
const fileStream = fs.createReadStream(request.file.path);

const params = {
  Bucket: 'cloudydays-project1-s3bucket-input',
  Key: request.file.originalname,
  Body: fileStream,
};

s3.putObject(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File uploaded successfully');
  }
});

}
exports.s3uploadfun=s3uploadfun;