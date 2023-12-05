const userResolvers = {
    Query: {
        users:async (_, { filter }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.users(ctx, filter)
        },
        user: async(_, {id}, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.users(ctx, { id: [id]})
        }
    },
    Mutation: {
        createUser: async (_, {  input }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.createUser(ctx, input)
        },
        updateUser: async (_, { id, revision, input }, { dataSources, ctx }) => {
            return await dataSources.serviceAPI.updateUser(ctx, id, revision, input)
        }
    }
};

module.exports = userResolvers;