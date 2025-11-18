import 'dotenv/config';
import mongoose from 'mongoose';

const testConnection = async () => {
    try {
        console.log('Testing database connection...');
        
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL not found in environment variables');
        }

        await mongoose.connect(process.env.DATABASE_URL);
        console.log('✅ Database connected successfully!');
        console.log('Database name:', mongoose.connection.name);
        console.log('Connection state:', mongoose.connection.readyState);
        
        await mongoose.disconnect();
        console.log('✅ Database disconnected successfully!');
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
};

testConnection();