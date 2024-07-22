const crypto = require("crypto");
const environmentToUse = require("../environments/env")

const utilities = {};

// parse JSON string to JS Object
utilities.parseJSON = (jsonString) => {
    let output = {};

    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }
    return output;
}

// validate user data coming from client
utilities.validateData = (data, moreThan) => {
    if (typeof (data) === 'string' && data.trim().length > moreThan) {
        return data.trim();
    } else {
        return false;
    }
}

utilities.hashString = (str) => {
    if (typeof (str) === 'string' && str.length > 0) {
        let hashedString = crypto.createHmac('sha256', environmentToUse.secret).update(str).digest('hex');
        return hashedString;
    } else {
        return false;
    }
}

module.exports = utilities;