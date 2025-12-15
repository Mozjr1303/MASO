        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                }

                .container {
                    box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.4);
                    border-radius: 15px;
                    padding: 20px;
                }

                .button {
                    text-decoration: none;
                    color: #fff;
                    text-align: center;
                    padding: 8px 13px;
                    border-radius: 20px;
                    background-color: #e23737;
                    margin-bottom: 10px;
                    font-size: 14px;
                    display: inline-block;
                }

                .footer {
                    padding: 15px;
                    text-align: center;
                    background-color: #e23737;
                    color: #fff;
                    margin-top: 20px;
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <p>Dear {{ $name }},</p>
                <p>Thank you for your interest in being added to our waiting list.</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a class="button" href="{{ $verificationLink }}" target="_parent">Verify Email</a>
                <p>Please do not reply to this email.</p>
                <div class="footer">
                    Maso Awards &copy; {{ $year }}
                </div>
            </div>
        </body>

        </html>