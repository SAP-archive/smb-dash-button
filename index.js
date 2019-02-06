/**
 * This is a sample Lambda function that Send messages to B1 and Creates Sales order on BYD
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
const BYD   = require('./modules/bydOdata')

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);

    switch (event.clickType) {
        case 'SINGLE':
            B1SL.PostMessage(callback)
            break;
        case 'DOUBLE':
            BYD.PostSalesOrder(callback)
            break;
        default:
            break
            
    }
};
