 const { User } = require("../models");
 const { signToken, AuthenticationError } = require("../utils/auth");
 
 const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("You are not logged in");
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            console.log(user)
            const token = signToken(user);
            
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const passwordAuth = await user.isCorrectPassword(password);

            if (!passwordAuth) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        savedBook: async (parent, { bookToSave }, context) => {
            if (context.user) {
                const result = await User.findByIdAndUpdate( { _id: context.user._id}, { $push: { savedBooks: bookToSave }},
                {
                    new: true,
                    runValidators: true,
                });

                return await User.findOne({ id: context.user._id }).populate(
                    "savedBooks"
                );
            }
            throw AuthenticationError;
        },

         removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const result = await User.findOneAndUpdate( { _id: context.user._id },
                {
                    $pull: {
                        savedBooks: { bookId },
                    },
                },
                { new: true });

                return await User.findOne({ id: context.user._id }).populate(
                    "savedBooks"
                );
            }
            throw new AuthenticationError("You are not logged in");
         },
    },
};

module.exports =  resolvers;