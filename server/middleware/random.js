const { v4: uuidv4 } = require('uuid');


const createId = function() { 
    const Id = uuidv4();
    return Id;
}

module.exports = {createId}