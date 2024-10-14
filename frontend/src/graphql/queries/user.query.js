import { gql} from '@apollo/client';

export const GET_AUTH_USERS = gql`
  query GetAuthUsers {
    authUser {
      _id
      email
      username
      name
      profilePicture
    }
  }
`;

// export const GET_USER_AND_TRANSACTIONS = gql`
//   query GetUserAndTransactions($userId: id){
//     user(userId: $userId){
//       _id
//       name
//       username
//       profilePicture
//       #relationship
//       transactions{
//         _id
//         description
//         paymentType
//         category
//         amount
//         location
//         date
//       }
//     }
//   }
// `

export const GET_USER_AND_TRANSACTIONS = gql`
	query GetUserAndTransactions($userId: ID!) {
		user(userId: $userId) {
			_id
			name
			username
			profilePicture
			# relationships
			transactions {
				_id
				description
				paymentType
				category
				amount
				location
				date
			}
		}
	}
`;