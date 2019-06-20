//verify token middleware
//format
//Authorization: Bearer <token>
function verifyToken(req, res, next) {

    const bearerHeader = req.headers["authorization"]
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next() //next middleware to avoid timeout server
    } else {
        res.status(403).json({ status: "forbidden" }) //forbidden

    }

}

module.exports = { verifyToken: verifyToken }
