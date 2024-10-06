import passport from "passport";
import bcrypt from "bcryptjs"

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";



const congfigurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing user");

        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (error) {
            done(error)
        }
    })

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (!user) {
                    throw new Error("Invalid username")
                }
                const validPassword = await bcrypt.compare(password, user.password)

                if (!validPassword) {
                    throw new Error("Invalid password")
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        })
    )
}

export default congfigurePassport;