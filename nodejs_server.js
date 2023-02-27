// we use express and multer libraries to send images
const express = require('express');
const multer = require('multer');
const { sendFiletoSQS } = require('./sqs');
const { receiveResponseSqs } = require('./receivesqs');
const { s3uploadfun } = require('./s3');
const server = express();
const PORT = 3000;

const fs = require('fs');

// uploaded images are saved in the folder "/upload_images"
const upload = multer({dest: __dirname + '/upload_images1'});

server.use(express.static('public'));

// "myfile" is the key of the http payload
server.post('/', upload.single('myfile'), async(request, respond) => {
  
 //if(request.file) console.log(request.file);
  
  // save the image

  // fs.rename(__dirname + '/upload_images/' + request.file.filename, __dirname + '/upload_images/' + request.file.originalname, function(err) {
  //   if ( err ) console.log('ERROR: ' + err);
  // });

  // sendFiletoSQS(request.file.originalname,respond);

  // s3uploadfun(request,respond);

  // receiveResponseSqs(request,respond);

  const s3result = await s3uploadfun(request,respond);
  
  if (s3result) {
    const sqsResult = await sendFiletoSQS(request.file.originalname,respond);
    if (sqsResult != undefined) {
      await receiveResponseSqs(request.file.originalname, respond);

    }
  }
  else
  {
    console.log("Error");
  }
});

// You need to configure node.js to listen on 0.0.0.0 so it will be able to accept connections on all the IPs of your machine
const hostname = '0.0.0.0';
server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
  });
