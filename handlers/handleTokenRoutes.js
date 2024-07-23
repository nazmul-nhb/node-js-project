const DB = require("../lib/DB");
const { validateData, hashString, parseJSON, createRandomString } = require("../utilities/utilities");

const routeHandlers = {};

// handler for token routes
routeHandlers.handleToken = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.includes(requestProperties.method)) {
        routeHandlers.token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405, {
            message: 'Method is Not Allowed!'
        });
    }
};

routeHandlers.token = {};

// create token
routeHandlers.token.post = (requestProperties, callback) => {
    const phone = validateData(requestProperties.body.phone, 10);
    const password = validateData(requestProperties.body.password, 0);

    if (phone && password) {
        DB.read("users", phone, (readError, data) => {
            let hashedPassword = hashString(password);
            const userData = parseJSON(data);
            if (hashedPassword === userData.password) {
                let tokenID = createRandomString(20);
                let expires = Date.now() + 60 * 60 * 1000;
                let tokenObject = { phone, id: tokenID, expires };

                DB.create("tokens", tokenID, tokenObject, (createError) => {
                    if (!createError) {
                        callback(200, {
                            success: true,
                            tokenObject
                        })
                    } else {
                        callback(500, {
                            success: false,
                            message: "Internal Server Error!"
                        });
                    }
                });
            } else {
                callback(400, {
                    success: false,
                    message: "Password Did Not Match!"
                });
            }
        })
    } else {
        callback(400, {
            success: false,
            message: "You have a Problem in Your Request!"
        });
    }
};


routeHandlers.token.get = (requestProperties, callback) => {
    // check the token id is valid
    const tokenID = validateData(requestProperties.queryStringObject.token, 37);

    if (tokenID) {
        DB.read("tokens", tokenID, (error, tokenData) => {
            if (!error && tokenData) {
                const token = { ...parseJSON(tokenData) };
                callback(200, { success: true, token });
            } else {
                callback(500, {
                    success: false,
                    message: "Internal Server Error!"
                });
            }
        });
    } else {
        callback(404, {
            success: false,
            message: "Token Not Found!"
        });
    }
};


routeHandlers.token.put = (requestProperties, callback) => {

};


routeHandlers.token.delete = (requestProperties, callback) => {

};

module.exports = routeHandlers;
