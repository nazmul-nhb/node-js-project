
// handler for sample route
export const handleSample = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(200, {
        message: 'This is Sample Route!'
    });
};

// handler 404 when route not found!
export const handleNotFound = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(404, {
        message: 'Not Found!'
    });
};