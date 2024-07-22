import http from "http";
import { parse } from "path";
import url from "url";
import { StringDecoder } from "string_decoder";


// module scaffolding
const app = {};

// config
app.config = {
    port: 4242
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to Port ${app.config.port}`);
    })
};

// handle request & response
app.handleReqRes = (req, res) => {
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

    // create data decoder
    const decoder = new StringDecoder('utf-8');

    // get body data or payload or whatsoever
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // handle response
        res.end("Hello World!");
    })

}

// start the server
app.createServer();