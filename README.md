# DevOps Portfolio Website Deployment using AWS

This project demonstrates the deployment of my DevOps portfolio website using a variety of AWS services, GitHub Actions, and custom domain integration. The website showcases my skills and achievements in DevOps and Cloud Security, allowing users to reach out via a contact form integrated with AWS Lambda.

## Components Used

### 1. **GitHub Actions**
   - GitHub Actions is used for the CI/CD pipeline that automates the deployment process of the website.
   - The GitHub Actions workflow automatically deploys the latest version of the website to AWS whenever code is pushed to the repository.

### 2. **AWS S3 (Simple Storage Service)**
   - AWS S3 is used to host the static files of the website.
   - The S3 bucket is configured for static website hosting, serving HTML, CSS, and JavaScript files to users.

### 3. **AWS Lambda**
   - AWS Lambda is used to handle contact form submissions from the website.
   - When a user submits the contact form, Lambda processes the data and stores it in a DynamoDB table for easy retrieval.
   - Lambda functions are triggered via API Gateway, which receives data from the contact form submission.

### 4. **AWS API Gateway**
   - AWS API Gateway serves as the connector between the public internet and the backend Lambda function that processes form submissions.
   - API Gateway is used to expose HTTP endpoints that invoke Lambda functions for handling contact form submissions.

### 5. **AWS Route 53**
   - AWS Route 53 is used for managing the DNS and routing traffic to the website.
   - It connects the domain to the S3 bucket via a custom domain purchased from GoDaddy, ensuring the website is publicly accessible.

### 6. **GoDaddy Custom Domain**
   - I purchased a custom domain from GoDaddy and used AWS Route 53 to link it to my website hosted on S3.
   - This ensures that my website can be accessed through a personalized and professional URL.

## Workflow of the Deployment Process

1. **Code Changes:**
   - When changes are made to the website, they are pushed to the GitHub repository. This triggers a GitHub Actions workflow.
  
2. **GitHub Actions CI/CD:**
   - The workflow in GitHub Actions performs the following tasks:
     - Builds the static assets (HTML, CSS, JavaScript).
     - Deploys these assets to the AWS S3 bucket.
  
3. **S3 Website Hosting:**
   - Once the files are deployed to the S3 bucket, the website is publicly accessible. S3 serves the content over HTTP, allowing users to visit the website using the domain configured in Route 53.
  
4. **Contact Form Submission:**
   - The website includes a contact form where users can submit their queries. 
   - When the form is submitted, AWS API Gateway triggers a Lambda function that processes the form data.
   - The data is stored in DynamoDB for later use.
  
5. **Custom Domain Configuration:**
   - The domain purchased from GoDaddy is connected to AWS Route 53.
   - Route 53 routes traffic to the S3 bucket, ensuring the website is accessible through the custom domain.

## Steps to Set Up

1. **Create an S3 Bucket:**
   - In the AWS Management Console, create an S3 bucket for hosting the website.
   - Enable static website hosting in the bucket settings.
  
2. **Set Up AWS Lambda:**
   - Create a Lambda function to process the contact form submissions.
   - Link this function to an API Gateway to make it publicly accessible.
  
3. **Create an API Gateway:**
   - Set up an API Gateway to handle HTTP requests and trigger the Lambda function for form submissions.
  
4. **Configure Route 53:**
   - Set up a hosted zone in Route 53 and configure DNS settings to point to the S3 bucket.
  
5. **Integrate GitHub Actions:**
   - Set up a GitHub Actions workflow to automate the deployment process to the S3 bucket whenever code changes are pushed.

6. **Custom Domain Configuration:**
   - Purchase a custom domain from GoDaddy and configure it to point to the AWS Route 53 DNS settings.

## Conclusion

This project demonstrates the power of AWS and GitHub Actions for automating the deployment of a personal website. By using services like AWS S3, Lambda, API Gateway, and Route 53, along with GitHub Actions for CI/CD, I was able to set up a fully functional, scalable, and secure web application. The integration of a custom domain from GoDaddy further enhances the professionalism of the website.
