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
      _id
      username
      email
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($concertId: ID!, $review: String!, $photos: [String], $videos:[String]) {
    addPost(concertId: $concertId, review: $review, photos: $photos, videos: $videos) {
        _id
        review
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

export const ADD_CONCERT = gql`
  mutation addConcert($title: String!, $description: String!, $date: String!, $location: String!, $artist: String!, $venue: String!, $city: String!, $country: String!, $image: String) {
    addConcert(title: $title, description: $description, date: $date, location: $location, artist: $artist, venue: $venue, city: $city, country: $country, image: $image) {
        _id
        title
        description
        date
        location
        artist
        venue
        city
        country
        image
    }
  }
`;

export const CONCERT_BY_DESCRIPTION = gql`
  query concertByDescription($description: String!) {
    concertByDescription(description: $description) {
      _id
      title
      date
      location
      artist
      venue
      city
      country
      image
    }
  }
`;