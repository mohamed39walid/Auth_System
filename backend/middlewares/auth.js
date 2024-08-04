const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer token

    if (!token){
        return res.redirect('/login');        
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token." });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
