const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        const userRole = decodedToken.role;
        if (req.body._id && req.body._id !== userId) {
            throw new Error("Invalid user ID");
        } else {
            res.locals.role = userRole;
            next()
        }
    } catch (error) {
        console.error(error)
        res.status(401).json({error: error.stack.split('\n')[0]});
    }
};