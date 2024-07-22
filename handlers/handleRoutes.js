const handlers = {};
// handler for sample route
handlers.handleSample = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(200, {
        message: 'This is Sample Route!'
    });
};

// handler 404 when route not found!
handlers.handleNotFound = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(404, {
        message: 'Not Found!'
    });
};

module.exports = handlers;