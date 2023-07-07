import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
            _id
            username
            email
        }
      }
    }
  `;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        user { 
        _id
        username
        email
    }
  }
}

`;

export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!, $userId: ID!, $concertId: ID!, $photos: [String], $videos:[String]) {
    addPost(title: $title, content: $content, userId: $userId, concertId: $concertId, photos: $photos, videos: $videos) {
        _id
        title
        content
        photos
        videos
        user {
            _id
            username
            email
        }
        concert {
            _id
            title
            date
            location
            artist
            venue
            city
            country
        }
        votes
    }
  }
`;

export const VOTE_POST = gql`
  mutation votePost($postId: ID!) {
    votePost(postId: $postId) {
        _id
        title
        content
        votes
    }
  }
`;
