import bcryptjs from "bcryptjs";
import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, email, password, gender } = input;
                if (!username || !name || !email || !password || !gender) {
                    throw new Error("All fields required");
                }
                const existingUser = await User.findOne({ username });
                const existingEmail = await User.findOne({ email });
                if (existingUser) {
                    throw new Error("username already exist");
                }
                if (existingEmail) {
                    throw new Error("email already exist");
                }

                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;

                //username
                //name
                //email
                //password
                //gender
                //profilepicture
                //
                const newUser = new User({
                    username,
                    name,
                    email,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                });
                await newUser.save();
                await context.login(newUser);
                return newUser;
            } catch (error) {
                console.error("Error in signup", error);
                throw new Error(error.message || "Internal server error");
            }
        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                const { user } = await context.authenticate("graphql-local", { email, password });

                await context.login(user)
                return user;

            } catch (error) {
                console.error("Error in login", error);
                throw new Error(error.message || "Internal server error")
            }
        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                context.req.session.destroy((err) => {
                    if (err) throw err;
                })
                context.res.clearCookie("connect.sid")
                return { message: "logout successful" }
            } catch (error) {
                console.error("Error in logout", error);
                throw new Error(error.message || "Internal server error")
            }
        }
    },
    Query: {
        authUser: async (_, __, { context }) => {
            try {
                const users = await context.getUser();
                return users;
            } catch (error) {
                console.error("error in authUsers", error);
                throw new Error("internal server error")
            }
        },
        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId)
                return user;
            } catch (error) {
                console.error("error in user", error);
                throw new Error("internal server error")
            }
        },
    },
};

export default userResolver;
