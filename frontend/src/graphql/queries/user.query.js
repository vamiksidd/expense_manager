import { gql, useQuery } from '@apollo/client';

export const GET_AUTH_USERS = gql`
  query GetAuthUsers {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;