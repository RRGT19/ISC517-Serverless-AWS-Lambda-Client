# Serverless AWS Lambda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## S3 bucket policy

For the browser to download objects from the S3 bucket, the bucket and it's objects need to be public so they can be downloaded without authentication.

```json
{
    "Version": "2008-10-17",
    "Id": "Policy1397495964002",
    "Statement": [
        {
            "Sid": "Stmt123",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::myBucketName/*"
        }
    ]
}
```
