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
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
            border-radius: 20px;
            padding: 20px;
            background-color: rgba(158, 50, 45, 0.4);
        }

        .content {
            background-color: #ffffff;
            color: #333333;
            line-height: 1.6;
            padding: 5px 10px;
        }

        .container img {
            max-width: 150px;
            display: block;
            margin: 2px auto;
        }

        .button {
            text-decoration: none;
            color: #fff;
            text-align: center;
            padding: 8px 12px;
            border-radius: 20px;
            background-color: #9e322d;
            margin-bottom: 10px;
            font-size: 14px;
            display: inline-block;
            box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
        }

        .header {
            padding: 15px;
            text-align: center;
            background-color: #9e322d;
            color: #fff;
            margin-top: 20px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        }

        .footer {
            padding: 15px;
            text-align: center;
            background-color: #9e322d;
            color: #fff;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header"><img src="https://maso-awards.live/frontend/assets/img/maso-icon.png" alt=""></div>
        <div class="content">
            <p>Dear {{ $name }},</p>
            <p>We would like to inform you that a Maso Awards ticket has been purchased using your promo code.</p>
            <ul>
                <li>Ticket Type: {{ strtoupper($ticketType) }}</li>
                <li>Balance: MK {{ $amount }}</li>
            </ul>
        </div>
        <div class="footer">
            Maso Awards &copy; {{ date('Y') }}
        </div>
    </div>
</body>

</html>
