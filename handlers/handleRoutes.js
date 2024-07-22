const routeHandlers = {};
// handler for sample route
routeHandlers.handleSample = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(200, {
        message: 'This is Sample Route!'
    });
};

// handler 404 when route not found!
routeHandlers.handleNotFound = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(404, {
        message: 'Not Found!'
    });
};

module.exports = routeHandlers;
