import { gql } from "@apollo/client"

export const GET_TRANSACTIONS = gql`
    query GetTransactions{
    transactions{
        _id
        amount
        description
        paymentType
        category
        date
        location
    }
  }
`
export const GET_TRANSACTION = gql`
    query GetTransactions($id:ID!){
    transaction(transactionId:$id){
        _id
        amount
        description
        paymentType
        category
        date
        location
    }
  }
`
export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionsStatistics{
	categoryStatistics{
		category
		totalAmount
	}
  }
`