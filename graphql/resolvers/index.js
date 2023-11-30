/* Copyright (c) 2020 Nurocor Inc. All Rights Reserved. */

const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')


let resolvers

try {
    const resolverGlob = path.join(__dirname, './**/*-resolvers.js')
    const resolversArray = loadFilesSync(resolverGlob)
    resolvers = mergeResolvers(resolversArray)
} catch (error) {
    console.error(error)
}

/** @module */
module.exports = resolvers
