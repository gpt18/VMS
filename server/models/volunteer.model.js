import { Schema, model } from 'mongoose'

const volSchema = new Schema({
    vol_id: {
        type: String,
        unique: true,
        required: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    properties: {
        name: {
            first: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
            },
            last: {
                type: String,
                trim: true,
                lowercase: true,
            }
        },
        father_name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        dob: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER"],
            required: true
        },
        phone: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Please fill a valid phone number'],
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        },
        address: {
            locality: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
            },
            pincode: {
                type: String,
                required: true,
                match: [/^\d{6}$/, 'Please fill a valid pincode'],
            }
        },
        experience: {
            type: String,
            trim: true,
            lowercase: true,
        },
        qualification: {
            type: String,
            trim: true,
            lowercase: true,
        },
        photo: {
            type: String,
        },
        aadhar: {
            front: {
                type: String,
            },
            back: {
                type: String,
            },
        },
    },
    joined_ngo: [
        {
            ngo: {
                type: Schema.Types.ObjectId,
                ref: 'ngos'
            },
            zone: {
                type: String,
                trim: true,
                lowercase: true,
            },
            joined_date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    event_enroll: [
        {
            event: {
                type: Schema.Types.ObjectId,
                ref: 'events'
            },
            status: {
                type: String,
                enum: ["JOINED", 'LEFT', 'COMPLETED'],
            }
        }
    ],
    
}, { timestamps: true })

export default model('Volunteer', volSchema)