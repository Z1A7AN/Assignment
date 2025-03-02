import { app } from "./app.js";
import { connectDb } from "./database/connectMongoDb.js";
import dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT || 8000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log('Error connecting to the database', error.message);
});