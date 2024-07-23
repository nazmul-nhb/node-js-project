const routeHandlers = require("../handlers/handleUserRoutes");

// route handlers 
const routes = {
    "": routeHandlers.handleRoot,
    sample: routeHandlers.handleSample,
    user: routeHandlers.handleUser,
}

module.exports = routes;
