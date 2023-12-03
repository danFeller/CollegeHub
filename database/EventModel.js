const mongoose = require("mongoose");
const dbConfig = require("./dbConfig");
const EventSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['DRAFT', 'IN_PROGRESS', 'COMPLETED'],
        required: true
    },
    name: {
        type: String
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
})

const Event = mongoose.model("Event", EventSchema);
EventSchema.set(dbConfig.collections[1].name, "custome_event");
module.exports = {Event};