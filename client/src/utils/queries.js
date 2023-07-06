import { gql } from '@apollo/client'

export const QUERY_USER_POSTS = gql`
query userPosts($userId: ID!) {
    Post(userId: $userId) {
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
}`