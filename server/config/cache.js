const redis = require("redis");
const host = process.env.REDIS_LABS_HOST;
const port = process.env.REDIS_LABS_PORT;
const password = process.env.REDIS_LABS_PASSWORD;

const redisClient = redis.createClient({ host, port });

redisClient.auth(password);

redisClient.on("error", err => {
    console.log(`Redis Error: ${err}`);
});

redisClient.on("connect", function() {
    console.log("Connected to Redis client");
});

redisClient.hkeys("", (err, replies) => {
    if (err) {
        console.log(err);
    } else {
        console.log(replies.length + " replies:");

        replies.forEach((reply, i) => {
            console.log("    " + i + ": " + reply);
        });
    };  
});

module.exports = redisClient;