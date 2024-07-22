import http from "http";
import { handleReqRes } from "./handlers/handleReqRes.js";
import environmentToUse from "./environments/env.js";


// module scaffolding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(environmentToUse.port, () => {
        console.log(`Listening to Port ${environmentToUse.port}`);
    })
};



// start the server
app.createServer();