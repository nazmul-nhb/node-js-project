const fs = require("fs");
const path = require("path");

const DB = {};

// base directory for db folder
DB.baseDir = path.join(__dirname, '/../db/');

// create a new file and write data to the file
DB.create = (dir, fileName, data, callback) => {
    // open file for writing
    fs.open(DB.baseDir + dir + '/' + fileName + '.json', 'wx', (createError, fileDescriptor) => {
        if (!createError && fileDescriptor) {
            // stringify data
            const stringifiedData = JSON.stringify(data);

            // write data to file and close it
            fs.writeFile(fileDescriptor, stringifiedData, (writeError) => {
                if (!writeError) {
                    fs.close(fileDescriptor, (closeError) => {
                        if (!closeError) {
                            callback(false);
                        } else {
                            callback("Error Closing File!");
                            console.error(closeError);
                        }
                    })
                } else {
                    callback("Error Writing New File!");
                    console.error(writeError);
                }
            })
        } else {
            callback("Error Creating File!");
            console.error(createError);
        }
    })
};

// read data from file
DB.read = (dir, fileName, callback) => {
    fs.readFile(DB.baseDir + dir + '/' + fileName + '.json', 'utf-8', (readError, data) => {
        callback(readError, data);
    })
};

module.exports = DB;