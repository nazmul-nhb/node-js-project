import url from "url";
import { StringDecoder } from "string_decoder";
import routes from "../routes/routes.js";
import { handleNotFound } from "./handleRoutes.js";


// handle request & response
export const handleReqRes = (req, res) => {
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
    const requestProperties = { path, parsedURL, method, queryStringObject, headersObject };

    // create data decoder
    const decoder = new StringDecoder('utf-8');

    // get body data or payload or whatsoever
    let realData = '';

    const chosenHandler = routes[path] ? routes[path] : handleNotFound;

    chosenHandler(requestProperties, (statusCode, payload) => {
        // process status code and payload
        const processedStatusCode = typeof (statusCode) === 'number' ? statusCode : 500;
        const processedPayload = typeof (payload) === 'object' ? payload : {};

        // stringify the processed payload object
        const stringifiedPayload = JSON.stringify(processedPayload);

        // return the final response
        res.writeHead(processedStatusCode);
        res.end(stringifiedPayload);
    })

    // process incoming data
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    // 
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // handle response
        res.end("Hello World!");
    })
}