import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id
        })
        await newTransaction.save()
        return newTransaction;
      } catch (error) {
        console.error("error in mutation createTransaction", error);
        throw new Error("internal server error");
      }
    },
    updateTransaction: async (_,{input},context) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId , input ,{new:true});

        return updateTransaction;
      } catch (error) {
        console.error("error in updatetransactions", error);
        throw new Error("internal server error");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
			try {
				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error("Error deleting transaction");
			}
		},

    
  },
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("unauthorized");
        }
        const userId = await context.getUser._id;
        const allTransactions = await Transaction.find({ userId: userId });
        return allTransactions;
      } catch (error) {
        console.error("error in transactions", error);
        throw new Error("internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        const transaction = await Transaction.findById(transactionId)
        return transaction;
      } catch (error) {
        console.error("error in transaction", error);
        throw new Error("internal server error");
      }
    }

    //todo => add category statistics query
  },
};

export default transactionResolver;
