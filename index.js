/**
 * This is a sample Lambda function that sends an email on click of a
 * button. It requires these SES permissions.
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:GetIdentityVerificationAttributes",
                "ses:SendEmail",
                "ses:VerifyEmailIdentity"
            ],
            "Resource": "*"
        }
    ]
}
 *
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

'use strict';

const B1SL  = require('./modules/b1ServiceLayer');
const BYD   = require('./moules/bydOdata')

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);

    switch (event.clickType) {
        case 'SINGLE':
            B1SL.PostMessage(callback)
        case 'DOUBLE':
            BYD.PostSalesOrder(callback)
        default:
            break
            
    }
};
