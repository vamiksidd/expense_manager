const transactionTypeDef = `#graphql
   type Transaction {
    _id: ID!
    userId: ID!
    email: String!
    description: String!
    paymentType: String!
    category: String!
    amount: String!
    location: String
    date: String!
   }
   type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction 
    #todo => add category statistics query
   } 
 
   type Mutation {
     createTransaction(input:CreateTransactionInput!):Transaction!
     updateTransaction(input:UpdateTransactionInput!):Transaction!
     deleteTransaction(transactionId:ID!):Transaction!
   }
   input CreateTransactionInput{
    description: String!
    paymentType: String!
    category: String!
    amount: String!
    date: String!
    location: String
   } 
   input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }

  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }
`
export default transactionTypeDef