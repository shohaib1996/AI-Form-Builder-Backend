import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function startServer() {
    try {
        await mongoose.connect(config.MONGO_URI as string);
        console.log("Connected to MongoDB");
    
        const PORT = config.PORT;
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

startServer()