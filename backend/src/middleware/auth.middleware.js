import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({success: false, message: "Unauthorized" })
    }
    let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({success: false, message: "Unauthorized" })
        }

        const user = await db.user.findUnique({ where: { id: decoded.id }, select: {
            id: true,
            email: true,
            name: true,
            role: true,
            Image: true
        } });

        if(!user) {
            return res.status(401).json({success: false, message: "Unauthorized" })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized" })
    }
}