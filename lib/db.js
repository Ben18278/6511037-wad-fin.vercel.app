import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI; // Get the MongoDB URI from environment variables

// Check if the MONGO_URI environment variable is defined
if (!MONGO_URI) {
    throw new Error(
        'Please define the MONGO_URI environment variable inside .env',
    );
}

// Create a cache to hold the database connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to the MongoDB database
async function dbConnect() {
    // Return the existing connection if it exists
    if (cached.conn) {
        return cached.conn;
    }
    
    // Create a new connection if one doesn't exist
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering of commands
        };
        
        // Create a new promise that resolves when the connection is established
        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('DB connected'); // Log success message
            return mongoose; // Return the mongoose instance
        });
    }
    
    // Wait for the promise to resolve and cache the connection
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset the promise on error
        throw e; // Re-throw the error for further handling
    }

    return cached.conn; // Return the established connection
}

// Export the dbConnect function for use in other modules
export default dbConnect;
