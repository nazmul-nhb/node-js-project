const DB = require("../lib/DB");
const { validateData, hashString, parseJSON } = require("../utilities/utilities");

const routeHandlers = {};

// handler for root route
routeHandlers.handleRoot = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(200, {
        message: 'Welcome to Simple Node.js Server!'
    });
};

// handler 404 when route not found!
routeHandlers.handleNotFound = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(404, {
        message: 'Not Found!'
    });
};

// handler for sample route
routeHandlers.handleSample = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(200, {
        message: 'This is Sample Route!'
    });
};

// handler for sample route
routeHandlers.handleUser = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.includes(requestProperties.method)) {
        routeHandlers.users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405, {
            message: 'Method is Not Allowed!'
        });
    }
};

routeHandlers.users = {};

// create user
routeHandlers.users.post = (requestProperties, callback) => {
    const firstName = validateData(requestProperties.body.firstName, 0);
    const lastName = validateData(requestProperties.body.lastName, 0);
    const phone = validateData(requestProperties.body.phone, 10);
    const password = validateData(requestProperties.body.password, 0);

    if (firstName && lastName && phone && password) {
        // make sure that the user does not already exist
        DB.read('users', phone, (readError) => {
            if (readError) {
                const userInfo = { firstName, lastName, phone, password: hashString(password) }
                DB.create('users', phone, userInfo, (createError) => {
                    if (!createError) {
                        callback(200, {
                            success: true,
                            message: "User Created Successfully!"
                        })
                    } else {
                        callback(500, {
                            success: false,
                            message: "Could Not Create User!"
                        })
                    }
                })
            } else {
                callback(409, {
                    message: "User Exists with the Same Phone Number!"
                });
            }
        })
    } else {
        callback(400, {
            message: "You have a Problem in Your Request!"
        })
    }
};

routeHandlers.users.get = (requestProperties, callback) => {
    // callback(200, { message: "Hi there!" });
    // check the phone number is valid
    const phone = validateData(requestProperties.queryStringObject.phone, 10);

    if (phone) {
        DB.read("users", phone, (error, data) => {
            if (!error && data) {
                const user = { ...parseJSON(data) };
                delete user.password;
                callback(200, {
                    success: true,
                    user
                })
            } else {
                callback(404, {
                    success: false,
                    message: "User Not Found! Try a Different Phone Number!"
                })
            }
        })
    } else {
        callback(404, {
            success: false,
            message: "User Not Found! Try a Different Phone Number!"
        })
    }
};

routeHandlers.users.put = (requestProperties, callback) => {

};

routeHandlers.users.delete = (requestProperties, callback) => {

};

module.exports = routeHandlers;
