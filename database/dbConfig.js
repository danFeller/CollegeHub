const mongoose = require("mongoose");
module.exports = {
    dbName: 'event-management',
    collections: [
        {
            name: "users",
            validator: {
                $jsonSchema: {
                    bsonType: "object"
                },
                required: ["username", "email", "firstName", "lastName"],
                properties: {
                    username: {
                        bsonType: "string",
                        description: "Username must be a string.",
                    },
                    email: {
                        bsonType: "string",
                        pattern: "@gmail\\.com$",
                        description: "Email must be a string and match the regular expression pattern.",
                    },
                    firstName: {
                        bsonType: "string",
                        description: "The first name of the user"
                    },
                    lastName: {
                        bsonType: "string",
                        description: "The last name of the user"
                    },
                    events: [
                        {
                            bsonType: "string",
                            reference: 'events'
                        }
                    ]
                }
            },
            indexes: [
                {
                    key: { username: 1 },
                    unique: true
                },
                {
                    key: { email: 1 },
                    unique: true
                },
            ]
        },
        {
            name: "events",
            validator: {
                $jsonSchema: {
                    bsonType: "object"
                },
                required: ['status', 'name', 'organizer', 'location', 'startTime', 'endTime', 'organizer'],
                properties: {
                    status: {
                        enum: ['DRAFT', 'IN_PROGRESS', 'COMPLETED']
                    },
                    name: {
                        bsonType: 'string'
                    },
                    location: {
                        bsonType: 'object',
                        required: ['address', 'city', 'state', 'zipcode', 'country'],
                        properties: {
                            address: {
                                bsonType: 'string'
                            },
                            city: {
                                bsonType: 'string'
                            },
                            state: {
                                bsonType: 'string'
                            },
                            zipcode: {
                                bsonType: 'string'
                            },
                            country: {
                                bsonType: 'string'
                            }
                        }
                    },
                    organizer: {
                        bsonType: 'string',
                        ref: 'users'
                    },
                    attendees: [
                        {
                            bsonType: 'string',
                            ref: 'users'
                        }
                    ],
                    startTime: {
                        bsonType: 'string'
                    },
                    endTime: {
                        bsonType: 'string'
                    }

                }
            },
            indexes: [
                {
                    key: {
                        name: 1
                    },
                    unique: true
                }
            ]
        }
    ]
}