const AWS = require('aws-sdk');
const { response } = require('express');
const sqs = new AWS.SQS({ region: 'us-east-1' }); // Replace region with your preferred region

const sendFiletoSQS = (request, respond) => {
    const message = {
        MessageBody:request
      };
    
      const queueUrl = 'https://sqs.us-east-1.amazonaws.com/486647676456/cloudydays-project1-sqs-input'; // Replace with your SQS queue URL
    
      let senderResponse = sqs.sendMessage({ QueueUrl: queueUrl, MessageBody: message.MessageBody }).promise()
        // if (err) {
        //   console.log('Error sending message:', err);
        // } else {
        //   console.log('Message sent:', data.MessageId);
        // }
      respond ={
        statusCode : 200,
        body: senderResponse
      }

      return respond;
}  


exports.sendFiletoSQS=sendFiletoSQS;