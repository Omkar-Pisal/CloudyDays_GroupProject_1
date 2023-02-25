const AWS = require('aws-sdk');
const { response } = require('express');
const sqs = new AWS.SQS({ region: 'us-east-1' }); // Replace region with your preferred region


const receiveResponseSqs = (request, respond) => {
  
    const params = {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/486647676456/cloudydays-project1-sqs-output',
      MaxNumberOfMessages: 10,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 20,
    };
    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        console.log('Error receiving messages from SQS', err);
        return;
      }
      const messages = data.Messages;
      console.log(messages);
    
      if (!messages || messages.length === 0) {
        console.log('No messages received from SQS');
        return;
      }
    
      messages.forEach((message) => {
        console.log('Received message:', message.Body);
        
        // Delete the message from the queue
        const deleteParams = {
          QueueUrl: params.QueueUrl,
          ReceiptHandle: message.ReceiptHandle,
        };
    
        sqs.deleteMessage(deleteParams, (err,data) => {
          if (err) {
            console.log('Error deleting message from SQS', err);
            return;
          }
          else{
            respond.status(200).send(message.Body);
          }
        });
      });
    });
  }
  exports.receiveResponseSqs = receiveResponseSqs;