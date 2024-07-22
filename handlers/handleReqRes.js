const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes/routes");
const routeHandlers = require("./handleRoutes");

const handlers = {};
// handle request & response
handlers.handleReqRes = (req, res) => {
    // request handling

    // get the url and parse it
    const parsedURL = url.parse(req.url, true);
    // console.log(parsedURL);

    // get polished pathname without any slashes at start or end
    const path = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
    // console.log(path);

    // get request method
    const method = req.method.toLowerCase();
    // console.log(method);

    // get query string as object
    const queryStringObject = parsedURL.query;
    // console.log(queryStringObject);

    // get request headers as object
    const headersObject = req.headers;
    // console.log(headersObject);

    // request properties
    const requestProperties = { parsedURL, path, method, queryStringObject, headersObject };

    // create data decoder
    const decoder = new StringDecoder('utf-8');

    // get body data or payload or whatsoever
    let realData = '';

    // declare handler to choose correct route handler
    const chosenHandler = routes[path] ? routes[path] : routeHandlers.handleNotFound;

    // process incoming data
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    // handle request and request body
    req.on('end', () => {
        realData += decoder.end();
        // console.log(realData);

        // choose correct handler to handle request and routes
        chosenHandler(requestProperties, (statusCode, payload) => {
            // process status code and payload
            const processedStatusCode = typeof (statusCode) === 'number' ? statusCode : 500;
            const processedPayload = typeof (payload) === 'object' ? payload : {};

            // stringify the processed payload object
            const stringifiedPayload = JSON.stringify(processedPayload);

            // return the final response
            res.setHeader('content-type', 'application/json')
            res.writeHead(processedStatusCode);
            res.end(stringifiedPayload);
        });
    });
};

module.exports = handlers;
