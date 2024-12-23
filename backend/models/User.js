import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';
const { hash } = pkg;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 10);
    next();
});

export default model('User', UserSchema);
