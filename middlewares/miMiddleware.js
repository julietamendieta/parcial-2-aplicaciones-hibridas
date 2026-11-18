const miMiddleware = (request, response, next) => {
    console.log('Hola desde el middleware');
    next(); //->El middleware es una fx para proteger rutas. Con next, podemos hacer que pase a la sig fx.
}

export default miMiddleware;