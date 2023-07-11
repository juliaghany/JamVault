import { gql } from '@apollo/client'

export const QUERY_USER_POSTS = gql`
query userPosts($userId: ID!) {
    Post(userId: $userId) {
        review
        media
        concert
        votes
        createdAt
        User {
            username
        }
        Concert {
          description
        }
    }
}
`;

export const QUERY_CONCERT_POSTS = gql`
query getConcertPosts ($concertId: ID!) {
    Post (concertId: $concertId) {
        review
        media
        concert
        votes
        createdAt
        User {
            username
        }
    }
}`;

export const CONCERT_BY_DESCRIPTION = gql`
  query concertByDescription($description: String!) {
    concertByDescription(description: $description) {
      _id
      description
      date
      artist
      venue
      city
      country
      image
    }
  }
`;