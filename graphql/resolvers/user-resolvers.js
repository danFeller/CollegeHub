const userResolvers = {
    Query: {
        user:async (_, { filter }, { dataSources, ctx }) => {},
        users: async(_, {id}, { dataSources, ctx }) => {}
    },
    Mutation: {
        createUser: async (_, {  input }, { dataSources, ctx }) => {},
        updateUser: async (_, { id, revision, input }, { dataSources, ctx }) => {}
    }
};

module.exports = userResolvers;