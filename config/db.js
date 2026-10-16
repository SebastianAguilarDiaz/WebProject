import mongoose from 'mongoose';

export const connectDB = async(mongoURL)=>{
    try{
        const conn= await mongoose.connect(mongoURL);
        console.log(`MonogDB Atlas Connected: ${conn.connection.host}`);

    }catch(error){
        console.error(`Database Connnection Error: ${error.message}`);
        process.exit(1);
    }
}