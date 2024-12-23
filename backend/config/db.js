import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/mvp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
