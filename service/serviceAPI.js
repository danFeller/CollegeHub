const { DataSource } = require('apollo-datasource')
const {collections} = require("../database/database");
const {v4} = require('uuid')
const {ObjectId} = require("mongodb");

class ServiceAPI extends DataSource {

    reconcileDocument(doc) {
        if (doc) {
            if (Array.isArray(doc)) {
                for(let i = 0; i < doc.length; i++) {
                    this.reconcileDocument(doc[i])
                }
            } else {
                if (!('id' in doc) || !doc.id) {
                    doc.id = doc._id
                }
                if (!doc.__type) {
                    doc.__type = 'Event'
                }
            }
            return doc
        }
    }

    async createEvent(ctx, input){
        //find the organizer detail
        if (!input.organizer || input.organizer === '') {
            throw new Error(`Provide a valid organizer!`)
        }
        const organizer = await collections.users.findOne({_id: new ObjectId(input.organizer)})
        if (!organizer) {
            throw new Error(`Invalid organizer provided.`)
        }
        const insertedDocument = await collections.events.insertOne({ ...input, revision: v4(), attendees: []})
        const result = await collections.events.findOne( {_id: insertedDocument.insertedId})
        this.reconcileDocument(result)
        return result
    }
    async updateEvent(ctx, id, revision, input){
        const filter = {
            _id: new ObjectId(id),
            revision: revision
        }
        const update = {
            $set: {
                ...input,
                revision: v4()
            }
        }
        await collections.events.updateOne(filter,update, { upsert: true})
        const result = await collections.events.findOne( { _id: new ObjectId(id) })
        this.reconcileDocument(result)
        return result

    }

    async deleteEvent(ctx, id){
        const deletedObject = await collections.events.deleteOne({_id: new ObjectId(id)})
        if (deletedObject) {
            return `Event: ${id} is deleted.`
        }
        return `Event: ${id} failed to delete.`
    }

    async addUser(ctx, eventId, eventRevision, userId){
        if (!userId || userId === '') {
            throw new Error(`Invalid user provided to add to an event.`)
        }
        // Check if the user exists
        const user = await collections.users.findOne({ _id: new ObjectId(userId)})
        if (!user) {
            throw new Error(`No such user found in the record.`)
        }

        // Find event
        const event = await collections.events.findOne( {_id: new ObjectId(eventId), revision: eventRevision})

        const update = {
            $set: {
                attendees: [
                    ...event.attendees,
                    new ObjectId(userId)
                ]
            }
        }

        await collections.events.updateOne({_id: new ObjectId(eventId), revision: eventRevision},update, { upsert: true})
        const result = await collections.events.findOne( { _id: new ObjectId(eventId) })
        this.reconcileDocument(result)
        return result
    }

    async removeUser(ctx, eventId, eventRevision, userId){}

    async events(ctx, filter){}

    async users(ctx, filter){}

    async createUser(ctx, input){
        const insertedDocument = await collections.users.insertOne({ ...input, revision: v4()})
        const result = await collections.users.findOne( {_id: insertedDocument.insertedId})
        this.reconcileDocument(result)
        return result
    }
    async updateUser(ctx, id, revision, input){
        const filter = {
            _id: new ObjectId(id),
            revision: revision
        }
        const update = {
            $set: {
                ...input,
                revision: v4()
            }
        }
        await collections.users.updateOne(filter,update, { upsert: true})
        const result = await collections.users.findOne( { _id: new ObjectId(id) })
        this.reconcileDocument(result)
        return result

    }

    
}

/** @module */
module.exports = new ServiceAPI()
