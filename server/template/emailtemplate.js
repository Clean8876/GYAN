// emailTemplate.js

export const getEmailTemplate = (otp)=> {
    return {
      text: `Verification Email
  
  One Time Password (OTP)
  
  Your verification code for Gyan is: ${otp}
  
  If you did not request this code, please ignore this email.
  
  For assistance, contact us at support@gyan.com.`,
      html: `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verification Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .content {
        text-align: center;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        padding-top: 20px;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verification Email</h1>
      </div>
      <div class="content">
        <h2>One Time Password (OTP)</h2>
        <p>Your verification code for Gyan is:</p>
        <h3 style="color: #2c3e50;">${otp}</h3>
      </div>
      <div class="footer">
        <p>If you did not request this code, please ignore this email.</p>
        <p>For assistance, contact us at <a href="mailto:support@gyan.com">support@gyan.com</a>.</p>
      </div>
    </div>
  </body>
  </html>`
    };
  }
  

  