import Location from "../models/LocationModel.js";
import Appointment from "../models/AppointmentModel.js";

class LocationController{
    async getAll(req, res){
        try{
            const locations = await Location.find().populate('appointment');

            res.json({
                message: 'success',
                data: locations
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la lista de ubicaciones.'
            })
        }
    }

    async getByName(req, res){
        try{
            const name = req.params.name;
            const location = await Location.findOne({ name });

            if(!location){
                return res.status(404).json({
                    message: 'Ubicación no encontrada.'
                });
            }

            res.json({
                message: 'success',
                data: location
            });

        }catch(error){
            res.status(500).json({
                message: 'Error al obtener la ubicación.'
            })
        }
    }

    async getApptbyLocation(req, res){
            try{
                const locationid = req.params.locationid;
    
                const locationExists = await Location.findById(locationid);
    
                if(!locationExists){
                    return res.status(404).json({
                        message: 'No hay ninguna ubicación registrada con ese id.'
                    });
                }
                
                const filter = {location:locationid};
    
                const appts = await Appointment.find(filter).populate(['client','employee']);
    
                res.json({
                    message: 'success',
                    data: appts
                })
            }catch (error){
                res.status(500).json({
                    message: 'Error al obtener los turnos asignados a esta ubicación.'
                })
            }
        }

    async create(req, res){
        try{
            const {name, address} = req.body;

            if( !name || !address){
                return res.status(403).send("Complete todos los campos obligatorios.")
            }

            const location = await Location.create({name, address});
            res.status(201).json({
                message: 'success',
                data: location
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al crear la ubicación.'
            })
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {name, address} = req.body;

            if( !name || !address){
                return res.status(403).send("Complete todos los campos obligatorios.")
            }
            const location = await Location.findByIdAndUpdate(id, {name, address}, {new: true, runValidators: true});

            res.json({
                message: 'success',
                data: location
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al actualizar la ubicación.'
            })
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            const location = await Location.findByIdAndDelete(id);

            if(!location){
                return res.status(404).json({
                message: 'Ubicación no encontrada.'
            })
            }
            res.json({
                message: 'success'
            })

        }catch(error){
            res.status(500).json({
                message: 'Error al eliminar la ubicación.'
            })
        }
    }
}

export default LocationController;