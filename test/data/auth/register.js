export const goodUser = {
    name: {
        first: "Richard",
        last: "Antao"
    },
    email: { 
        address: "rantao@uwo.ca"    
    },
    password: "abc123"
};

export const badEmail = {
    name: {
        first: "Richard",
        last: "Antao"
    },
    email: { 
        address: "rantaouwo.ca" // missing '@'
    },
    password: "abc123"
};

export const badPassword = {
    name: {
        first: "Richard",
        last: "Antao"
    },
    email: { 
        address: "rantao@uwo.ca"    
    },
    password: "abc12" // less than 6 characters
};
