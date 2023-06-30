// typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        concerts: [Concert]
        posts: [Post]
    }

    type Concert {
        _id: ID!
        title: String!
        date: String!
        location: String!
        artist: String!
        venue: String!
        city: String!
        country: String!
        posts: [Post]
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        photos: [String]
        videos: [String]
        user: User!
        concert: Concert!
        votes: Int!
    }

    type Query {
        users: [User]
        concerts: [Concert]
        Posts: [Post]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addPost(title: String!, content: String!, userId: ID!, concertId: ID!): Post
        votePost(postId: ID!): Post
    }