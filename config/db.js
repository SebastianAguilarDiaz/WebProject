import mongoose from 'mongoose';

// Connects to MongoDB with the given URL.
// If the connection fails, the process stops so the app does not run without a database.
export const connectDB = async(mongoURL)=>{
    try{
        const conn= await mongoose.connect(mongoURL);
        console.log(`MonogDB Atlas Connected: ${conn.connection.host}`);

    }catch(error){
        console.error(`Database Connnection Error: ${error.message}`);
        process.exit(1);
    }
}
