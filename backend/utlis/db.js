import mongoose from "mongoose";

const DBCon = async()=> {
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\nMongodb is connected ${connectionInstance.connection.host}`);
    
    
    } catch (error) {
        console.log("MongoDb error", error);
        process.exit(1)

    }
}

export default DBCon;