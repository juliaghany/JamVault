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
        image: String!
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
        addPost(title: String!, content: String!, userId: ID!, concertId: ID!, photos: [String], videos: [String]): Post
        votePost(postId: ID!): Post
        addConcert(title: String!, date: String!, location: String!, artist: String!, venue: String!, city: String!, country: String!, image: String!): Concert
        addConcertToUser(userId: ID!, concertId: ID!): User
    }
`;

module.exports = typeDefs;