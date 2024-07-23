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

utilities.createRandomString = (num) => {
    const length = typeof (num) === 'number' && num > 0 ? num : false;

    if (length) {
        // const possibleChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
        // let output = "";

        // for (let i = 0; i <= length; i++) {
        //     const randomChar = possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
        //     output += randomChar;
        // }
        // return output;

        const date = new Date();
        const formattedDate = date.toISOString().replace(/[-:.TZ]/g, '');

        // generate a random string with alphanumeric characters
        const randomString = Array.from({ length: length }, () => Math.random().toString(36).slice(2, 3)).join('');

        return `${formattedDate}-${randomString}`;
    } else {
        return false;
    }
}

module.exports = utilities;