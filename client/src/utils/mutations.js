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
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($concertId: ID!, $review: String!, $media: [String]) {
    addPost(concertId: $concertId, review: $review, media: $media) {
      _id
      review
      media
      user {
        _id
        username
        email
      }
      concert {
        _id
        description
        date
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

export const ADD_CONCERT = gql`
  mutation addConcert($description: String!, $date: String!, $artist: String!, $venue: String!, $city: String!, $country: String!, $image: String!) {
    addConcert(description: $description, date: $date, artist: $artist, venue: $venue, city: $city, country: $country, image: $image) {
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