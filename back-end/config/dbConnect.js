import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL);
mongoose.set("strictQuery", true);
        console.log(`Mongodb connect ${connected.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;

//wFN4ReJu1gFVhYAK
//mongodb+srv://Gemora:<db_password>@cluster0.nq5mv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0