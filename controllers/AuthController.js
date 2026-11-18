import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Client from "../models/ClientModel.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY

class AuthController{
    async login(req, res){
        try{
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(403).json({ message: 'Faltan parámetros obligatorios.'})
            }

            const client = await Client.findOne({email});
            if(!client){
                return res.status(401).json({ message: 'Credenciales inválidas.'})
            }

            const isValid = await bcrypt.compare(password, client.password);
            if(!isValid){
                return res.status(401).json({ message: 'Credenciales inválidas.'})
            }

            res.status(200).json({
                message: 'success',
                data: client
            })

            //Generamos el token
            const payload = {
                id: client._id,
                email: client.email
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

    async register(req, res){
        try{
            const {name, email, password} = req.body;

            if(!name || !email || !password){
                return res.status(403).json({ message: 'Faltan parámetros obligatorios.'})
            }

            //Verificamos que el usuario no este registrado.
            const exists = await Client.findOne({email});
            if(exists){
                return res.status(403).json({ message: 'El usuario ya se encuentra registrado.', data: {}})
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newClient = await Client.create({
                name, email, password: hashedPassword
            })

            const data = {
                _id: newClient._id,
                name: newClient.name,
                email: newClient.email
            }

            res.status(201).json({
                message: 'success',
                data: newClient
            })

        }catch(error){
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export default AuthController;