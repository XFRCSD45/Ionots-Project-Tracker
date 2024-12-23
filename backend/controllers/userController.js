import User from "../models/User.js";

export default async function getUsers(req, res) {
    const { search } = req.query;
    console.log(search);
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: search ? search : '', $options: 'i' } },
            ]
        });        
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}