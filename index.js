import http from "http";


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
    // response
    res.end("Hello World!")
}

app.createServer();