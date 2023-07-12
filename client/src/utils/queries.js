import { gql } from '@apollo/client'

export const QUERY_USER_POSTS = gql`
query userPosts($userId: ID!) {
    userPosts(userId: $userId) {
      _id
      review
      media
      votes
      user {
        _id
        username
      }
      concert {
        _id
        description
        date
        artist
        venue
      }
    }
}`;
  

export const QUERY_CONCERT_POSTS = gql`
query getConcertPosts ($concertDescription: description!) {
    Post (concertDescription: $concertDescription) {
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