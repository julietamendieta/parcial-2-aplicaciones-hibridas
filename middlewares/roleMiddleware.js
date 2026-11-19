const roleMiddleware = (req, res, next) => {
        const role = req.user.role;
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
        }
        next();
};

export default roleMiddleware;