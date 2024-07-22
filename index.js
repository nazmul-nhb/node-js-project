const http = require("http");
const { handleReqRes } = require("./handlers/handleReqRes");
const { port } = require("./environments/env");
const DB = require("./lib/DB");


// module scaffolding
const app = {};

// testing file system

// DB.create('test', 'awami', { "name": "BAL", "type": "chutiya", "job": "killing" }, (error) => {
//     console.error(error);
// });

// DB.read('test', 'awami', (error, data) => {
//     data ? console.log(data) : console.error(error);
// });

// DB.update('test', 'awami', { "name": "BAL", "type": "chutiya", "job": "killing", "favorite": "india" }, (error) => {
//     console.error(error);
// });

// DB.delete('test', 'awami', (error) => {
//     error ? console.error(error) : console.log('Delete Success!');
// });

// create server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(port, () => {
        console.log(`Listening to Port ${port}`);
    })
};



// start the server
app.createServer();