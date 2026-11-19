import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Service = mongoose.model('service', ServiceSchema);

export default Service;