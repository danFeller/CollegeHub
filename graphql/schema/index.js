const { mergeTypeDefs } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { gql } = require('apollo-server-koa')
const path = require('path')

const graphqlGlob = path.join(__dirname, './**/*.graphql')
const graphqlArray = loadFilesSync(graphqlGlob)
const jsGlob = path.join(__dirname, './**/*-schema?(s).js')
const jsArray = loadFilesSync(jsGlob)

const graphql = mergeTypeDefs(
    [...graphqlArray, ...jsArray],
    {
        all: true,
        useSchemaDefinition: true,
        forceSchemaDefinition: true,
        throwOnConflict: true,
        commentDescriptions: true,
        reverseDirectives: true
    }
)

const typeDefs = gql`${graphql}`

if (require.main === module) {
    try {
        process.stdout.write(graphql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = typeDefs