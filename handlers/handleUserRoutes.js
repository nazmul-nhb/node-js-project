const DB = require("../lib/DB");
const { validateData, hashString, parseJSON } = require("../utilities/utilities");
const { token } = require("./handleTokenRoutes");

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

// handler for user routes
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
                        });
                    } else {
                        callback(500, {
                            success: false,
                            message: "Could Not Create User!"
                        });
                    }
                });
            } else {
                callback(409, {
                    success: false,
                    message: "User Exists with the Same Phone Number!"
                });
            }
        });
    } else {
        callback(400, {
            success: false,
            message: "You have a Problem in Your Request!"
        });
    }
};

routeHandlers.users.get = (requestProperties, callback) => {
    // check the phone number is valid
    const phone = validateData(requestProperties.queryStringObject.phone, 10);

    if (phone) {
        // verify token
        let incomingToken = validateData(requestProperties.headersObject.token, 37);

        token.verifyToken(incomingToken, phone, (isValid) => {
            if (isValid) {
                DB.read("users", phone, (error, data) => {
                    if (!error && data) {
                        const user = { ...parseJSON(data) };
                        delete user.password;
                        callback(200, { success: true, user });
                    } else {
                        callback(500, {
                            success: false,
                            message: "Internal Server Error!"
                        });
                    }
                });
            } else {
                callback(403, {
                    success: false,
                    message: "Forbidden Access!"
                });
            }
        });
    } else {
        callback(404, {
            success: false,
            message: "User Not Found! Try a Different Phone Number!"
        });
    }
};

routeHandlers.users.put = (requestProperties, callback) => {
    const phone = validateData(requestProperties.body.phone, 10);
    const firstName = validateData(requestProperties.body.firstName, 0);
    const lastName = validateData(requestProperties.body.lastName, 0);
    const password = validateData(requestProperties.body.password, 0);

    if (phone) {
        if (firstName || lastName || password) {
            // verify token
            let incomingToken = validateData(requestProperties.headersObject.token, 37);

            token.verifyToken(incomingToken, phone, (isValid) => {
                if (isValid) {
                    // lookup user in the db
                    DB.read("users", phone, (readError, data) => {
                        if (!readError && data) {
                            const userData = { ...parseJSON(data) };
                            if (firstName) {
                                userData.firstName = firstName;
                            }
                            if (lastName) {
                                userData.lastName = lastName;
                            }
                            if (password) {
                                userData.password = hashString(password);
                            }

                            // update in db
                            DB.update("users", phone, userData, (updateError) => {
                                if (!updateError) {
                                    callback(200, {
                                        success: true,
                                        message: "User Updated Successfully!"
                                    });
                                } else {
                                    callback(500, {
                                        success: false,
                                        message: "Could Not Update User!"
                                    });
                                }
                            });
                        } else {
                            callback(404, {
                                success: false,
                                message: "User Not Found! Try a Different Phone Number!"
                            });
                        }
                    });
                } else {
                    callback(403, {
                        success: false,
                        message: "Forbidden Access!"
                    });
                }
            });
        } else {
            callback(400, {
                success: false,
                message: "You have a Problem in Your Request!"
            });
        }
    } else {
        callback(404, {
            success: false,
            message: "User Not Found! Try a Different Phone Number!"
        });
    }
};

// TODO: Authenticate User Before Deleting
routeHandlers.users.delete = (requestProperties, callback) => {
    // check the phone number is valid
    const phone = validateData(requestProperties.queryStringObject.phone, 10);

    if (phone) {
        DB.read("users", phone, (readError, data) => {
            if (!readError && data) {
                DB.delete("users", phone, (deleteError) => {
                    if (!deleteError) {
                        callback(200, {
                            success: true,
                            message: "User Deleted Successfully!"
                        });
                    } else {
                        callback(500, {
                            success: false,
                            message: "Could Not Delete User!"
                        });
                    }
                })
            } else {
                callback(404, {
                    success: false,
                    message: "User Not Found! Try with a Different Phone Number!"
                });
            }
        });
    } else {
        callback(404, {
            success: false,
            message: "User Not Found! Try with a Different Phone Number!"
        });
    }
};

module.exports = routeHandlers;
