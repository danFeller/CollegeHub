const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { buildSubgraphSchema } = require('@apollo/subgraph')
const { printSchema } = require('graphql')
const schemaTypeDefs = require('./schema')
const resolvers = require('./resolvers')

const allTypeDefs = mergeTypeDefs([schemaTypeDefs], { all: true})
const allResolvers = mergeResolvers([resolvers])

const typeDefsAndResolvers = {
    typeDefs: allTypeDefs,
    resolvers: allResolvers
}

let federatedSchema = buildSubgraphSchema([typeDefsAndResolvers])

if (require.main === module) {
    process.stdout.write(printSchema(federatedSchema))
}

module.exports = {
    federatedSchema
}
