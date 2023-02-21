const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'us-east-1' }); // Replace region with your preferred region
AWS.config.update({
    region: 'us-east-1', // Replace with your preferred region
    accessKeyId: process.env.AKIAXCTTWHYUEMGVVIO4,
    secretAccessKey: process.env.zYK4x6MBzQEWC4ltXxynJlhm4J5b73wbvgUhqC1P,
  });

const message = {
    MessageBody: 'Hello from Node.js!',
  };

  const queueUrl = 'https://sqs.us-east-1.amazonaws.com/486647676456/cloudydays-project1-sqs-input'; // Replace with your SQS queue URL

  sqs.sendMessage({ QueueUrl: queueUrl, MessageBody: message.MessageBody }, (err, data) => {
    if (err) {
      console.log('Error sending message:', err);
    } else {
      console.log('Message sent:', data.MessageId);
    }
  });
  