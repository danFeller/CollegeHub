module.exports = {
    dbName: 'event-management',
    collections: [
        {
            name: "users",
            validator: {
                $jsonSchema: {
                    bsonType: "object"
                },
                required: ["username", "email"],
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
        }
    ]
}