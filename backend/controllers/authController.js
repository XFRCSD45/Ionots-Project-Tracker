import User from '../models/User.js';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export async function register(req, res) {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // console.log(user);
        const match=await bcrypt.compare(password, user.password);
        // console.log(match);
        if (!user || !match) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token:token, username:username, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
