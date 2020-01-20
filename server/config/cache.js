const redis = require("redis");
const redisClient = redis.createClient({
    host: "localhost", 
    port: 6379 
});

redisClient.on("error", err => {
    console.log(`Redis Error: ${err}`);
});

redisClient.on("connect", function() {
    console.log("Redis client connected");
});

redisClient.hkeys("", (err, replies) => {
    if (err) {
        console.log(err);
    } else {
        console.log(replies.length + "replies:");

        replies.forEach((reply, i) => {
            console.log("    " + i + ": " + reply);
        });

        redisClient.quit();
    };  
});

module.exports = redisClient;