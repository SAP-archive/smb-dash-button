/* ByD Integration with Odata Services */
/* Server Configuration and User Credentials set in environment variables */

/** Environment Variables Required: 
 *  BYD_SERVER -> https://my123456.sapbydesign.com
 *  BYD_AUTH:  -> [Base64 Encoded] user:password> - Use https://www.base64encode.org/
 * 
 * Optional Environment variables which have default values:
 * BYD_PATH: -> Odata API path -> /sap/byd/odata/cust/v1 -> CP100110
 * BYD_SALESORDER -> Sales Order Service Path -> /khsalesorderdemo/SalesOrderCollection
 * BYD_DEFAULT_BP -> A Business Partner Code for the ByD Sales Order -> CP100110
 * BYD_ITEM -> Item code for the Sales Order ->  P100401
 * 
 * */ 



//Load Node Modules
var req = require('request') // HTTP Client

//Load Local configuration file
const SL_SERVER = process.env.BYD_SERVER || "http://<YOUR SERVER>:50001/b1s/v1";

module.exports = {
    PostSalesOrder: function (callback) {
        return (PostSalesOrder(callback));
    }
}


function Connect(callback) {
    /* There is no "login" endpoint in ByD. Instead the Base64 credentials should be passed in
     * the header of a GET Request. From the response of this request, we retrieve a CSRF token
     * that is required for any other method (POST/PATCH/DELETE etc...). Session Cookies are also 
     * required and in this app all of them are stored in global variables.
     **/
    

}


function byDPost(options, endpoint, callback) {
    options.uri = SL_SERVER + endpoint
    console.log("Posting " + endpoint + " to " + options.uri)
    req.post(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            body = JSON.parse(body);
            delete body["odata.metadata"];
            callback(null, response, body);
        } else {
            callback(response.statusMessage, response, null);
        }
    });
}


function PostSalesOrder(options, callback) {

    Connect(function (error, resp) {
        if (error) {
            console.error("Can't Connect toService Lay er");
            console.error(error);
        } else {
            console.log("Connected Successfully, lets send a message");
            var options = {
                headers: {
                    'Cookie': resp.cookie
                }
            };
            options.body = {
                url: getByDserver() + model_sales,
                method: "POST",
                headers: [],
                body: {
                    ExternalReference: "From Dash Button",
                    DataOriginTypeCode: "1",
                    Name: "Order created via SMB Mkt Place @" + moment.now(),
                    SalesOrderBuyerParty: {
                        PartyID: process.env.BYD_DEFAULT_BP || 'CP100110'
                    },
                    SalesOrderItem: [
                        {
                            ID: "10",
                            SalesOrderItemProduct: {
                                ProductID: process.env.BYD_ITEM || 'P100401'
                            },
                            SalesOrderItemScheduleLine: [
                                {
                                    Quantity: "1"
                                }
                            ]
                        }
                    ]
                }
        }
            //Make Request
            byDPost(options, "/Messages", function (error, response, bodymess) {
                if (error) {
                    console.error("Error Sending SL Message \n" + error );
                } else {
                    console.log("Message Sent successfully!")
                }
            })
        }
    });
}