import { gql } from '@apollo/client'

export const QUERY_USER_POSTS = gql`
query userPosts($userId: ID!) {
    Post(userId: $userId) {
        title
        content
        media
        concert
        votes
        createdAt
        User {
            username
        }
    }
}
`;

export const QUERY_CONCERT_POSTS = gql`
query getConcertPosts ($concertDescription: description!) {
    Post (concertDescription: $concertDescription) {
        title
        content
        photos
        videos
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