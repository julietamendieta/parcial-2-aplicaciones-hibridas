import appointmentsRouter from './appointmentsRouter.js';
import clientsRouter from './clientsRouter.js';
import employeesRouter from './employeesRouter.js';
import authRouter from './authRouter.js';
import servicesRouter from './servicesRouter.js';
import locationsRouter from './locationsRouter.js';
import authEmployeeRouter from './authEmployeeRouter.js';

const routerAPI = (app) => {
    app.use('/api/appointments', appointmentsRouter);
    app.use('/api/clients', clientsRouter);
    app.use('/api/employees', employeesRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/services', servicesRouter);
    app.use('/api/locations', locationsRouter);
    app.use('/api/authEmployee', authEmployeeRouter);
}

export default routerAPI;