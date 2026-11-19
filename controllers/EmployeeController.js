import Employee from "../models/EmployeeModel.js";
import Appointment from "../models/AppointmentModel.js";

class EmployeeController{
    async getAll(req, res){
        try{
            const employees = await Employee.find();

            res.json({
                message: 'success',
                data: employees
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la lista de empleados.'
            })
        }
    }

    async getById(req, res){
        try{
            const id = req.params.id;
            const employee = await Employee.findById(id);
            
            if(!employee){
                return res.status(404).json({
                    message: 'No Encontrado.',
                });
            }
            res.json({
                message: 'success',
                data: employee
            });
            

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener el empleado.'
            })
        }
    }

    async getApptbyEmployee(req, res){
        try{
            const employeeid = req.params.employeeid;

            const employeeExists = await Employee.findById(employeeid);

            if(!employeeExists){
                return res.status(404).json({
                    message: 'No hay ningún empleado registrado con ese id.'
                });
            }
            
            const filter = {employee:employeeid};

            const appts = await Appointment.find(filter).populate(['client','employee']);

            res.json({
                message: 'success',
                data: appts
            })
        }catch (error){
            res.status(500).json({
                message: 'Error al obtener los turnos asignados a este empleado.'
            })
        }
    }


    async create(req, res){
        try{
            const {body} = req;
            const {name, email, password, tel, role} = body;

            if( !name || !email || !password || !tel){
                return res.status(403).send("Complete todos los campos obligatorios.")
            }

            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                return res.status(409).json({
                    message: 'Ya existe un empleado registrado con ese correo electrónico.'
                });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newEmployee = await Employee.create({
                name,
                email,
                password: passwordHash,
                tel,
                role
            })
            newEmployee.save();
            const id = newEmployee._id;
            res.json({
                message: `Empleado registrado con el ID: ${id}`
            })
        }catch(error){
            res.status(500).json({
                message: 'Error al crear el empleado.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {name, email, password, tel, role} = req.body;
            
            if( !name || !email || !password || !tel){
                return response.status(403).send("Complete todos los campos obligatorios.")
            }

            const data = {
                name, email, tel, role
            }
            if(password){
                data.password = await bcrypt.hash(password, 10);
            }

            const employee = await Employee.findByIdAndUpdate(id, data, {new: true, runValidators: true});

            res.json({
                message: 'success',
                data: employee
            })
        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar los datos del empleado.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const employee = await Employee.findByIdAndDelete(id);

            if(!employee){
                return res.status(404).json({
                message: 'Empleado no encontrado.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar el empleado.'
            })
        }
    }

    async uploadImage(req, res){
        try{
            if(!req.file){
                return res.status(400).json({
                    message: "No se envió el archivo."
                })
            }
            const imagePath = `/uploads/profiles/${req.file.filename}`
            const eid = req.employee.id
            const employee = await Employee.findByIdAndUpdate(eid, {profileImage: imagePath}, {new: true}).select('-password')
    

            res.status(200).json({
                message: 'Imagen actualizada',
                data: employee
            })
        }catch{
            res.status(500).json({
                message: 'Error al cargar imagen.'
            })
        }
    }
}

export default EmployeeController;