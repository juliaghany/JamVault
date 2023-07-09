const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        concerts: [Concert]
        posts: [Post]
    }
    type Auth {
        token: ID!
        user: User
      }

    type Concert {
        _id: ID!
        date: String!
        artist: String!
        venue: String!
        city: String!
        country: String!
        image: String!
        posts: [Post]
        description: String!
    }    

    type Post {
        _id: ID!
        review: String!
        media: [String]
        user: User!
        concert: Concert!
        votes: Int!
    }

    type Query {
        users: [User]
        concerts: [Concert]
        posts: [Post]
        userPosts(userId: ID!): Post
        concertPosts(concertDescription: String!): [Post]
        concertByDescription(description: String!): Concert
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addPost(title: String!, content: String!, userId: ID!, concertId: ID!, photos: [String], videos: [String]): Post
        votePost(postId: ID!): Post
        addConcert(description: String!, date: String!, artist: String!, venue: String!, city: String!, country: String!, image: String!): Concert
        addConcertToUser(userId: ID!, concertId: ID!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;