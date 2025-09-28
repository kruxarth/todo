import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB(){
    try {
        if(!process.env.MONGO_URL){
            throw new Error('MONGO_URL is not defined');
        }
        await mongoose.connect(process.env.MONGO_URL, {
            // options placeholder
        });
        console.log('MongoDB connected');
    } catch (e) {
        console.error('MongoDB connection error:', e.message);
        process.exit(1);
    }
}

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;













