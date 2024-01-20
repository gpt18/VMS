const mongoose = require('mongoose');

const ngoSchema = mongoose.Schema(
    {
        ngo_id: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        ngo_name: {
            type: String,
            required: true,
        },
        ngo_logo: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        doc: {
            unique_id: {
                type: String,
            },
            pan: {
                type: String
            },
            verified: {
                type: Boolean,
                default: false
            }
        },
        properties: {
            zone_city: [{type: String}],
            state: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true,
            },
            sector: {
                type: String,
                required: true,
            },
            website: {
                type: String,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            }

        },
        event_list: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'events',
        }],
        volunteer_associated: [{
            volunteer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'volunteers',
            },
            status: {
                type: String,
                enum: ["JOINED", "LEFT", "REQUESTED", "BLOCKED"],
            }
        }]
    },
    {timestamps: true}
);


const NGO = mongoose.model('ngos', ngoSchema);

module.exports = NGO;