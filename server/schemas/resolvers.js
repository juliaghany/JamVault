const { User, Concert, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    concerts: async (_, {postId}) => {
      const params = postId? { postId }: {};
      return Concert.find(params)
    },
    posts: async () => {
      return Post.find({});
    },
    concertPosts: async( _,{ concertId }) => {
        return Post.findOne({ _id: concertId });
    },
    userPosts: async (parent, { userId }, context) => {
      console.log("userId: ", userId);
    
      const posts = await Post.find({ user: userId });
    
      console.log("posts: ", posts);
    
      return posts;
    },
  },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        try {
          const user = await User.create({ username, email, password });
          return user;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      addPost: async (parent, { concertId, review, media }, context) => {

        console.log(context)

        const authHeader = context.req.headers.authorization;
      
        if (!authHeader) {
          throw new AuthenticationError('Authorization header must be provided');
        }
    
        const token = authHeader.split(' ')[1];
        let user;
      
        try {
          user = jwt.verify(token, 'mysecretssshhhhhhh');
          console.log('***USER IN RESOLVER***: ', user); 
        } catch (err) {
          throw new AuthenticationError('Invalid/Expired token');
        }
      
        let newPost;
        try {
          newPost = await Post.create({
            review,
            concert: concertId,
            media,
            user: user.data._id
          });
        } catch (err) {
          console.error('Error creating post:', err);
          throw new Error('Failed to create post');
        }

        await Concert.findOneAndUpdate(
          {_id : concertId},
          { $addToSet: { posts: newPost._id}}
        )

        await User.findOneAndUpdate(
          {"_id":user.data._id},{ $addToSet: { posts: newPost._id}}
        )
      
        return newPost;
      },          
    votePost: async (parent, { postId }) => {
      const post = await Post.findById(postId);
      post.votes += 1;
      await post.save();
      return post;
    },
    addConcert: async (parent, { date, description, artist, venue, city, country, image }) => {
      let concertAdded = await Concert.create({ date, description, artist, venue, city, country, image });
      console.log("***** concert added *****")
      return concertAdded;
    },
    addConcertToUser: async (parent, { userId, concertId }) => {
      const user = await User.findById(userId);
      user.concerts.push(concertId);
      await user.save();
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      // const correctPw = await User.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw new AuthenticationError('Incorrect password!');
      // }

      const token = signToken(user);
      return { token, user };
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
