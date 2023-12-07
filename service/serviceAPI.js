const { DataSource } = require('apollo-datasource')
const {collections} = require("../database/database");
const {v4} = require('uuid')
const {ObjectId} = require("mongodb");
const { User } = require('../database/UserModel')


class ServiceAPI extends DataSource {

    reconcileUserDocument(doc) {
        if (doc) {
            if (Array.isArray(doc)) {
                for (let i = 0; i<doc.length; i++){
                    this.reconcileUserDocument(doc[i])
                }
            } else {
                if (!('id' in doc) || !doc.id) {
                    doc.id = doc._id.toString()
                }
                if (!doc.__type) {
                    doc.__type = 'User'
                }
                if (!doc.lastName) {
                    doc.lastName = 'unassigned'
                }
            }
            return doc
        }
    }

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
        const insertedDocument = await collections.events.insertOne({ ...input, revision: v4(), status: 'DRAFT', attendees: []})
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
        // Delete the event from the user collection
        await collections.users.updateMany({events: id}, { $pull: {events: id}})
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
            $addToSet: {
                attendees: userId
            }
        }

        await collections.events.updateOne({_id: new ObjectId(eventId), revision: eventRevision},update, { upsert: true})

        // Add event to the User collection
        if (!user.events.includes(eventId)){
            user.events.push(eventId)
            await collections.users.updateOne({_id: user._id}, { $push: { events: eventId }})
        }

        const result = await collections.events.findOne( { _id: new ObjectId(eventId) })
        this.reconcileDocument(result)
        return result
    }

    async removeUser(ctx, eventId, eventRevision, userId){
        // Remove the user from the attendees list
        await collections.events.updateMany({ _id: eventId, revision: eventRevision}, { $pull: { attendees: userId}})
        // Remove the event from the users collection
        await collections.users.updateMany({_id: userId}, { $pull: { events: eventId }})

        const event = await collections.events.find({_id: new ObjectId(eventId)})
        this.reconcileDocument(event)
        return event
    }

    async event(ctx, item) {
        const eventData = await collections.events.find({_id: new ObjectId(item)}).toArray()
        this.reconcileDocument(eventData)
        return eventData[0]
    }

    async events(ctx, filter) {

        const query = {}

        if (filter?.id && filter?.id?.length > 0) {
            query._id = { $in: filter.id.map((item) => new ObjectId(item))};
        }

        let events

        if (query.length > 0) {
            events = await collections.events.find(query).toArray()
        } else {
            events = await collections.events.find().toArray()
        }
        this.reconcileDocument(events)
        return events
    }

    async user(ctx, id) {
        const user = await collections.users.find({_id: new ObjectId(id)}).toArray()
        this.reconcileUserDocument(user)
        return user[0]
    }

    async users(ctx, filter){
        const query = {}

        if (filter?.id) {
            query._id = { $in: filter.id.map((item) => new ObjectId(item))};
        }

        if (filter?.firstName) {
            query.firstName = filter.firstName;
        }

        if (filter?.lastName) {
            query.lastName = filter.lastName;
        }

        if (filter?.email && filter?.email?.length > 0) {
            query.email = { $in: filter.email };
        }

        if (filter?.username && filter?.username?.length > 0) {
            query.username = { $in: filter.username };
        }

        if (filter?.events && filter?.events?.length > 0) {
            query.events = { $in: filter.events }
        }

        let users
        if (Object.keys(query).length > 0) {
            users = await collections.users.find(query).toArray()
        } else {
            users = await collections.users.find().toArray()
        }

        this.reconcileUserDocument(users)
        return users
    }

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
