const handlers = require("../handlers/handleRoutes");

// route handlers 
const routes = {
    "": handlers.handleRoot,
    sample: handlers.handleSample,
    user: handlers.handleUser,
}

module.exports = routes;
