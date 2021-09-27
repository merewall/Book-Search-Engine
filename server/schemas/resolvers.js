// BRING IN AUTHENTICATION ERROR MODULE, USER MODEL AND SIGNTOKEN MIDDLEWARE
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        
        return userData
      }
      // THROW ERROR FOR NEED TO LOG IN
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // ADD A USER TO DATABASE WITH USERNAME, EMAIL AND PASSWORD, AND CREATE A TOKEN
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // LOGIN A USER WITH THEIR EMAIL AND PASSWORD
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      // IF NO USER FOUND IN DATABASE, THROW ERROR
      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      // USE CUSTOM METHOD TO CHECK ENTERED PASSWORD AGAINST HASHED DB PASSWORD
      const correctPw = await user.isCorrectPassword(password);

      // THROW ERROR FOR INCORRECT PASSWORD
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      // CREATE TOKEN FOR USER
      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    saveBook: async (parent, { bookId, authors,  description, image, link, title }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        // FIND LOGGED IN USER IN DATABASE, AND ADD THE BOOK TO THEIR SAVEDBOOKS
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: { bookId, authors,  description, image, link, title } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a book from their own profile
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // FIND LOGGED IN USER IN DATABASE AND REMOVE THE SELECTED BOOK FROM THEIR SAVEDBOOKS
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      
        return updatedUser;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
