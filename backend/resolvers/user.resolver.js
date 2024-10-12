// import bcryptjs from "bcryptjs";

// import { users } from "../dummyData/data.js";
// import User from "../models/user.model.js";

// const userResolver = {
//   Mutation: {
//     signUp: async (_, { input }, context) => {
//       try {
//         const { username, name, email, password, gender } = input;
//         if (!username || !name || !email || !password || !gender) {
//           throw new Error("All fields required");
//         }
//         const existingUser = await User.findOne({ username });
//         const existingEmail = await User.findOne({ email });
//         if (existingUser) {
//           throw new Error("username already exist");
//         }
//         if (existingEmail) {
//           throw new Error("email already exist");
//         }

//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
//         const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;

//         //username
//         //name
//         //email
//         //password
//         //gender
//         //profilepicture
//         //
//         const newUser = new User({
//           username,
//           name,
//           email,
//           password: hashedPassword,
//           gender,
//           profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
//         });
//         await newUser.save();
//         await context.login(newUser);
//         return newUser;
//       } catch (error) {
//         console.error("Error in signup", error);
//         throw new Error(error.message || "Internal server error");
//       }
//     },
//     login: async (_, { input }, context) => {
//       try {
//         const { username, password } = input;
//         const { user } = await context.authenticate("graphql-local", {
//           email,
//           password,
//         });

//         await context.login(user);
//         return user;
//       } catch (error) {
//         console.error("Error in login", error);
//         throw new Error(error.message || "Internal server error");
//       }
//     },
//     logout: async (_, __, context) => {
//       try {
//         await context.logout();
//         context.req.session.destroy((err) => {
//           if (err) throw err;
//         });
//         context.res.clearCookie("connect.sid");
//         return { message: "logout successful" };
//       } catch (error) {
//         console.error("Error in logout", error);
//         throw new Error(error.message || "Internal server error");
//       }
//     },
//   },
//   Query: {
//     authUser: async (_, __, { context }) => {
//       try {
//         const users = await context.getUser();
//         return users;
//       } catch (error) {
//         console.error("error in authUser", error);
//         throw new Error("internal server error");
//       }
//     },
//     user: async (_, { userId }) => {
//       try {
//         const user = await User.findById(userId);
//         return user;
//       } catch (error) {
//         console.error("error in user", error);
//         throw new Error("internal server error");
//       }
//     },
//   },
// };

// export default userResolver;
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, name, password, email, gender } = input;

				if (!username || !name || !email || !password || !gender) {
					throw new Error("All fields are required");
				}
				const existingUsername = await User.findOne({ username });
				if (existingUsername) {
					throw new Error("User already exists");
				}
        const existingEmail = await User.findOne({email})
        if(existingEmail){
          throw new Error("Email already exist")
        }

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				// https://avatar-placeholder.iran.liara.run/
				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

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
			} catch (err) {
				console.error("Error in signUp: ", err);
				throw new Error(err.message || "Internal server error");
			}
		},

		login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				if (!username || !password) throw new Error("All fields are required");
				const { user } = await context.authenticate("graphql-local", { username, password });

				await context.login(user);
				return user;
			} catch (err) {
				console.error("Error in login:", err);
				throw new Error(err.message || "Internal server error");
			}
		},
		logout: async (_, __, context) => {
			try {
				await context.logout();
				context.req.session.destroy((err) => {
					if (err) throw err;
				});
				context.res.clearCookie("connect.sid");

				return { message: "Logged out successfully" };
			} catch (err) {
				console.error("Error in logout:", err);
				throw new Error(err.message || "Internal server error");
			}
		},
	},
	Query: {
		authUser: async (_, __, context) => {
			try {
				const user = await context.getUser();
				return user;
			} catch (err) {
				console.error("Error in authUser: ", err);
				throw new Error("Internal server error");
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error in user query:", err);
				throw new Error(err.message || "Error getting user");
			}
		},
	},
	// User: {
	// 	transactions: async (parent) => {
	// 		try {
	// 			const transactions = await Transaction.find({ userId: parent._id });
	// 			return transactions;
	// 		} catch (err) {
	// 			console.log("Error in user.transactions resolver: ", err);
	// 			throw new Error(err.message || "Internal server error");
	// 		}
	// 	},
	// },
};

export default userResolver;