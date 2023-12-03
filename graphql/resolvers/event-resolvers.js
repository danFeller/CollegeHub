const eventResolvers = {
    Query: {
         events:async (_, { filter }, { dataSources, ctx }) => {
             return await dataSources.serviceAPI.events(ctx, filter)
         },
        event: async(_, {id}, { dataSources, ctx }) => {
             return await dataSources.serviceAPI.events(ctx, { id: [id]})
        }
    },
    Mutation: {
        createEvent: async (_, {  input }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.createEvent(ctx, input)
        },
        updateEvent: async (_, { id, revision, input }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.updateEvent(ctx, id, revision, input)
        },
        deleteEvent: async (_, {  id }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.deleteEvent(ctx, id)
        },
        addUser: async (_, {  eventId, eventRevision, userId }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.addUser(ctx, eventId, eventRevision, userId)
        },
        removeUser: async (_, {  eventId, eventRevision, userId }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.removeUser(ctx, eventId, eventRevision, userId)
        }
    },
    Event: {
        __resolveReference: async (reference, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.events(ctx, { id: [reference.id]})
        },
        organizer: async(reference, { dataSources, ctx}) => {
            return await dataSources.serviceAPI.users(ctx, { id: [reference.organizer]})
        },
        attendees: async (reference, { dataSources, ctx}) => {
            return await dataSources.serviceAPI.users(ctx, { id: [reference.attendees.map(item => item.$oid)]})
        }
    }
};

module.exports = eventResolvers;