const mongoose = require('mongoose');
require('dotenv').config(); 


const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
    console.error('MongoDB connection string not found in environment variables');
    process.exit(1); 
}


mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
});

