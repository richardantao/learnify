exports.goodUser = {
    name: {
        first: "Richard",
        last: "Antao"
    },
    email: { 
        address: "rantao@uwo.ca"    
    },
    password: "abc123"
};

exports.badEmail = {
    name: {
        first: "Richard",
        last: "Antao"
    },
    email: { 
        address: "rantaouwo.ca" // missing '@'
    },
    password: "abc123"
};

exports.badPassword = {
    name: {
        first: "Richard",
        last: "Antao"
    },
    email: { 
        address: "rantao@uwo.ca"    
    },
    password: "abc12" // less than 6 characters
};
