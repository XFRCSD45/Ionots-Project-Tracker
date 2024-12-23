import  jwt  from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    // console.log("reached middleware");
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

export const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

// export default { authenticateToken, authorizeRole };
