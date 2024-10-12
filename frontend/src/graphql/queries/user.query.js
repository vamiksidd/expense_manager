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