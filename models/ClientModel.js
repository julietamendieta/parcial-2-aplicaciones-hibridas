import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tel:{
        type: Number,
        required: true
    }
});

const Client = mongoose.model('client', ClientSchema);

export default Client;