const JWT = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized access'});
    }
    try{
        const decode = JWT.verify(auth, process.env.JWT_SECERET);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401)
            .json({ message: 'Invalid token'});
    }
}

module.exports = ensureAuthenticated;