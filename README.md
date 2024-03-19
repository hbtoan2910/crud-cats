# Một ứng dụng CRUD API sử dụng Serverless Framework và DynamoDB (not directly writing code in AWS WebConsole)
## A project using Nodejs, AWS Lambda, API Gateway, Serverless Framework và DynamoDB

1. Khởi tạo project Serverless Node.js

  Install global serverless: npm install -g serverless

  Check version: serverless -v hoặc sls -v

  Initialize a project Serverless Node.js: sls create --template aws-nodejs --path crud-cats --name crud-cats

  Deploy project: sls deploy

2. Cấu hình thông tin đăng nhập AWS vào máy local

  2 options: một là export chúng vào biến môi trường của dự án, hai là cấu hình sử dụng AWS Profile. Let's use 1st option :)

  AWS WebConsole > IAM > Add use details > Set permission > finally get Access key ID & Secret access key

  Add into enviroment variable:

  Linux:
  
    export AWS_ACCESS_KEY_ID=<your-key-here>
  
    export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>

    verify: printenv | grep AWS
    
  Windows:
  
    setx AWS_ACCESS_KEY_ID=<your-key-here>
  
    setx AWS_SECRET_ACCESS_KEY=<your-secret-key-here>

    verify: $env:AWS_ACCESS_KEY_ID
    

3. Viết API tạo con mèo – Create Cat


4. API gọi con mèo – Get Cat


5. API chỉnh sửa thông tin mèo – Update Cat


6. API xóa con mèo – Delete Cat


![image](https://github.com/hbtoan2910/crud-cats/assets/59778636/82e030c2-4435-4b7a-8e73-6e69588ee9ca)


### IMPORTANT NOTES: 

1. The Lambda handler function receives three parameters: event, context, and callback. The callback function is used to send the response asynchronously.

   The first parameter of the callback function (null in this case) is used to indicate any errors that may have occurred during the execution of the Lambda function.

   Example:

   exports.handler = (event, context, callback) => {
   
    // Perform some logic based on the event
   
    // Construct the response object
   
    const response = {
   
        statusCode: 200,  // HTTP status code
   
        body: JSON.stringify({
   
              message: "Succesfully created cat",
   
             cat: catResult.get(),

             }),  // Response body
   
        headers: {
   
            'Content-Type': 'application/json'  // Response headers - optional
   
        }
    };

    // Use the callback to send the response asynchronously
   
    callback(null, response);
   
};

2. 
