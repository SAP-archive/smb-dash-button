/* Service Layer module to interact with B1 Data */
/* Server Configuration and User Credentials set in environment variables */

//Load Node Modules
var req = require('request') // HTTP Client

//Load Local configuration file
const SL_SERVER = process.env.SL_SERVER || "http://52.28.129.221:50001/b1s/v1";

module.exports = {
    PostMessage: function (callback) {
        return (PostMessage(callback));
    }
}


function Connect(callback) {
    var uri = SL_SERVER + "/Login"
    var resp = {}

    //B1 Login Credentials
    var data = {
        UserName: process.env.B1_USER || "manager",
        Password: process.env.B1_PASS || "1234",
        CompanyDB: process.env.B1_COMP || "SBODEMOUS"
    };

    //Set HTTP Request Options
    var options = {
        uri: uri,
        body: JSON.stringify(data)
    }

    console.log("Connecting to SL on " + uri);
    //Make Request
    req.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            console.log("Connection to SL Successfully \n" + body)
            resp.cookie = response.headers['set-cookie']
            callback(null, resp);
        } else {
            callback(response.statusMessage, response);
        }
    });

}


function SLPost(options, endpoint, callback) {
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


function PostMessage(options, callback) {

    Connect(function (error, resp) {
        if (error) {
            console.error("Can't Connect to Service Layer");
            console.error(error);
        } else {
            console.log("Connected Successfully, lets send a message");
            var options = {
                headers: {
                    'Cookie': resp.cookie
                }
            };
            options.body = JSON.stringify({
                            RecipientCollection: [{
                                SendInternal: "tYES",
                                UserCode: process.env.B1_USER_ENV || "manager"
                            }],
                            Subject: "Dash Button Pressed",
                            Text: "This is a message from your dash button"
                        })
            //Make Request
            SLPost(options, "Messages", function (error, response, bodymess) {
                if (error) {
                    console.error("Error Sending SL Message \n" + error );
                } else {
                    console.log("Message Sent successfully!")
                }
            })
        }
    });
}