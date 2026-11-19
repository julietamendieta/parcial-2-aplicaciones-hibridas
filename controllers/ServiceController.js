import Service from "../models/ServiceModel.js";
import Appointment from "../models/AppointmentModel.js";

class ServiceController{
    async getAll(req, res){
        try{
            const services = await Service.find().populate('appointment');

            res.json({
                message: 'success',
                data: services
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la lista de servicios.'
            })
        }
    }

    async getByName(req, res){
        try{
            const name = req.params.name;
            const service = await Service.findOne({ name });

            if(!service){
                return res.status(404).json({
                    message: 'Servicio no encontrado.'
                });
            }

            res.json({
                message: 'success',
                data: service
            });

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener el servicio.'
            })
        }
    }

    async getApptbyService(req, res){
                try{
                    const serviceid = req.params.serviceid;
        
                    const serviceExists = await Service.findById(serviceid);
        
                    if(!serviceExists){
                        return res.status(404).json({
                            message: 'No hay ningún servicio registrado con ese id.'
                        });
                    }
                    
                    const filter = {service:serviceid};
        
                    const appts = await Appointment.find(filter).populate(['client','employee']);
        
                    res.json({
                        message: 'success',
                        data: appts
                    })
                }catch (error){
                    res.status(500).json({
                        message: 'Error al obtener los turnos asignados a este servicio.'
                    })
                }
            }

    async create(req, res){
        try{
            const {name} = req.body;

            if( !name ){
                return res.status(403).send("Complete todos los campos obligatorios.")
            }

            const service = await Service.create({name});
            res.status(201).json({
                message: 'success',
                data: service
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al crear el servicio.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.serviceId;
            const {name} = req.body;

            if( !name){
                return res.status(403).send("Complete todos los campos obligatorios.")
            }
            const service = await Service.findByIdAndUpdate(id, {name}, {new: true, runValidators: true});

            res.json({
                message: 'success',
                data: service
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar el servicio.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.serviceId;
            const service = await Service.findByIdAndDelete(id);

            if(!service){
                return res.status(404).json({
                message: 'Servicio no encontrado.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar el servicio.'
            })
        }
    }
}

export default ServiceController;