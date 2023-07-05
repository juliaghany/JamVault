const { User, Concert, Post } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        concerts: async () => {
            return Concert.find({});
        },
        posts: async () => {
            return Post.find({});
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            return User.create(( username, email, password ));
        },
        addPost: async (parent, { title, content, userId, concertId, photos, videos }) => {
            return Post.create({ title, content, user: userId, concert: concertId, photos, videos });
        },
        votePost: async (parent, { postId }) => {
            const post = await Post.findById(postId);
            post.votes += 1;
            await post.save();
            return post;
            },
        addConcert: async (parent, { title, date, location, artist, venue, city, country, image }) => {
            return Concert.create({ title, date, location, artist, venue, city, country, image });
        },
        addConcertToUser: async (parent, { userId, concertId }) => {
            const user = await User.findById(userId);
            user.concerts.push(concertId);
            await user.save();
            return user;
        },
    },

    User: {
        concerts: async (user) => {
            return Concert.find({ _id: { $in: user.concerts } });
        },
        posts: async (user) => {
            return Post.find({ _id: { $in: user.posts } });
        },
    },

    Concert: {
        posts: async (concert) => {
            return Post.find({ _id: { $in: concert.posts } });
        },
    },

    Post: {
        user: async (post) => {
            return User.findById(post.user);
        },
        concert: async (post) => {
            return Concert.findById(post.concert);
        },
    },
};

module.exports = resolvers;