const { handleToken } = require("../handlers/handleTokenRoutes");
const { handleRoot, handleSample, handleUser } = require("../handlers/handleUserRoutes");

// route handlers 
const routes = {
    "": handleRoot,
    sample: handleSample,
    user: handleUser,
    token: handleToken,
};

module.exports = routes;
