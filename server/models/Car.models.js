const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carModel: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    pic: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('car',CarSchema);