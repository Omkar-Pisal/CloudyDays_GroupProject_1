import boto3
import subprocess
# Create SQS client
sqs = boto3.client('sqs',region_name='us-east-1')
s3 = boto3.client('s3',region_name='us-east-1')

sqs_output = boto3.client('sqs',region_name='us-east-1')

queue_url = 'https://sqs.us-east-1.amazonaws.com/486647676456/cloudydays-project1-sqs-input'

queue_url_output = 'https://sqs.us-east-1.amazonaws.com/486647676456/cloudydays-project1-sqs-output'

# Receive message from SQS queue
response = sqs.receive_message(
    QueueUrl=queue_url,
    AttributeNames=[
        'SentTimestamp'
    ],
    MaxNumberOfMessages=1,
    MessageAttributeNames=[
        'All'
    ],
    VisibilityTimeout=0,
    WaitTimeSeconds=0
)

message = response['Messages'][0]
receipt_handle = message['ReceiptHandle']

filename = message['Body']

print('Received message: %s' % filename)

s3.download_file('cloudydays-project1-s3bucket-input', filename, "downloaded_images/"+filename)

filename_path = "downloaded_images/"+filename

classification = subprocess.run('python3 image_classification.py %s'%filename_path)

# Send message to SQS queue
response_output = sqs_output.send_message(
    QueueUrl=queue_url_output,
    DelaySeconds=10,
    MessageAttributes={
        
    },
    MessageBody=(
        classification
    )
)

#Upload file to s3
s3.upload_file(Filename=filename,Bucket="cloudydays-project1-s3bucket-output", Key="downloaded_images/"+filename)

# Delete received message from queue
sqs.delete_message(
    QueueUrl=queue_url,
    ReceiptHandle=receipt_handle
)