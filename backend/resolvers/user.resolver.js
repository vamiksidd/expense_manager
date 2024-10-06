import { users } from "../dummyData/data.js"

const userResolver = {
    Query: {
        users: (_,__,{context}) => {
            console.log(context);
            
            return users
        },
        user: (_, { userId }) => {
            return users.find((user) => user._id === userId)
        }
    },
    Mutation: {}
}

export default userResolver