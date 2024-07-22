import http from "http";
import { handleReqRes } from "./handlers/handleReqRes.js";


// module scaffolding
const app = {};

// config
app.config = {
    port: 4242
};

// create server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to Port ${app.config.port}`);
    })
};



// start the server
app.createServer();