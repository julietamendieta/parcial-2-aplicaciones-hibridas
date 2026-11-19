import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).json({
            message: 'No se proporcionó un token de autenticación.'
        })
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return response.status(401).json({
            message: 'No se proporcionó un token de autenticación.'
        })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user = decoded; //->Agregamos la info del usuario al request para que esté disponible en las rutas protegidas.
    } catch (error) {
        return response.status(401).json({
            message: 'Token de autenticación inválido.'
        })
    }

    next(); //->El middleware es una fx para proteger rutas. Con next, podemos hacer que pase a la sig fx.
}

export default authMiddleware;