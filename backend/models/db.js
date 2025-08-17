const mongoose = require('mongoose');
require('dotenv').config(); // <--- Make sure dotenv is imported to load env vars

const mongo_url = process.env.MONGO_CONN;

console.log('MongoDB URI:', mongo_url); // (Optional) Add this to debug what is loaded

mongoose.connect(mongo_url)
.then(() => {
    console.log("MongoDB Connected...");
}).catch((err) => {
    console.log("MongoDB Connection error: ", err);
});
