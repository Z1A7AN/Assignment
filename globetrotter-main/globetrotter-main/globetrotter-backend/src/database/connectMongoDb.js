import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URI;

export const connectDb = async () => {
    try {
        const instance = await mongoose.connect(`${mongodbUrl}`);
        if(instance) {
            console.log('Database connection successful at host::', instance.connection.host);
        }
    } catch (error) {
        console.log('Error connecting to the database', error.message);
    }
}