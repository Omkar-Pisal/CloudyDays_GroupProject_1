const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'us-east-1' }); // Replace region with your preferred region

const sendFiletoSQS = (request, response) => {
    const message = {
        MessageBody:request
      };
    
      const queueUrl = 'https://sqs.us-east-1.amazonaws.com/486647676456/cloudydays-project1-sqs-input'; // Replace with your SQS queue URL
    
      sqs.sendMessage({ QueueUrl: queueUrl, MessageBody: message.MessageBody }, (err, data) => {
        if (err) {
          console.log('Error sending message:', err);
        } else {
          console.log('Message sent:', data.MessageId);
        }
      });
}  
exports.sendFiletoSQS=sendFiletoSQS;