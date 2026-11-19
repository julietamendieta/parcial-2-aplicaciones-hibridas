import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Employee from "../models/EmployeeModel.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY

class AuthController{
    
    async register(req, res){
        try{
            const {name, email, password, tel, role} = req.body;

            if(!name || !email || !password || !tel){
                return res.status(403).json({ message: 'Faltan parámetros obligatorios.'})
            }

            //Verificamos que el usuario no este registrado.
            const exists = await Employee.findOne({email});
            if(exists){
                return res.status(403).json({ message: 'El empleado ya se encuentra registrado.', data: {}})
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newEmployee = await Employee.create({
                name, email, password: hashedPassword
            })

            const data = {
                id: newEmployee._id,
                name: newEmployee.name,
                email: newEmployee.email,
                tel: newEmployee.tel,
                role: newEmployee.role
            }

            res.status(201).json({
                message: 'success',
                data
            })

        }catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async login(req, res){
        try{
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(403).json({ message: 'Faltan parámetros obligatorios.'})
            }

            const employee = await Employee.findOne({email});
            if(!employee){
                return res.status(401).json({ message: 'Credenciales inválidas.'})
            }

            const isValid = await bcrypt.compare(password, employee.password);
            if(!isValid){
                return res.status(401).json({ message: 'Credenciales inválidas.'})
            }

            res.status(200).json({
                message: 'success',
                data: employee
            })

            //Generamos el token
            const payload = {
                id: employee._id,
                email: employee.email
            }

            const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
            
            res.status(200).json({
                message: 'Credenciales correctas.',
                token
            })

        }catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export default AuthController;