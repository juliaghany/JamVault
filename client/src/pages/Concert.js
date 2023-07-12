import React from "react";
import { Card } from 'react-bootstrap';
import SavedConcertList from "../components/SavedConcertList";
import { useQuery } from "@apollo/client";
import { QUERY_CONCERTS } from "../utils/queries";

const Concert = () => {

    const { loading, data } = useQuery(QUERY_CONCERTS)
    const concerts = data?.concerts || []
//     const concertId = concerts._id
//   const { loading, data, error } = useQuery(QUERY_CONCERTS, {
//     variables: { concertId }
//   });
//   const concerts = data?.concerts || [];


  console.log("userId: ", concerts);
  console.log("loading: ", loading); 
  console.log("data: ", data);

  // if (!userId.length) {
  //   return <h3>no posts yet</h3>
  // }
  
//   if (error) {
//     console.error("GraphQL error occurred while fetching saved concerts:", error);
//   } 
  
  console.log("Fetched data:", data);  



  return (
    <>
        <Card>
            {loading ? (
                <div>loading...</div>
            ) : (
                <SavedConcertList concerts={concerts} title="Saved Concerts" />
            )}
        </Card>
    </>
);
};

export default Concert;

// OG CODE BELOW
// // import React, { useState, useEffect } from "react";
// import { Card } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';

// import PostList from "../components/PostList";
// import { useQuery } from "@apollo/client";
// import { QUERY_USER_POSTS } from "../utils/queries";
// // import Auth from '../utils/auth';

// const UserPosts = () => {
//   const { loading, data } = useQuery(QUERY_USER_POSTS);
//   const posts = data?.posts || [];

//   return (
//     <>
//       <Card>
//         {loading ? (
//           <div>loading...</div>
//         ) : (
//           <PostList posts={posts} title="Oh all the places you've been" />
//         )}
//       </Card>
//     </>
//   );
// };

// export default UserPosts;


// Concert.js

//useQuery(LEt's us see all concerts in our database)
//_id
//artist
//venue
//date

//It will be an object, but eventually the concert data will be an array of concert objects
//Create a component to render a singleConcertInListPreview => props of the current concert we iterate through and render it to the page

// useQuery(//e can use the id of the selected conert to then fetch that specific concert and all associated posts)
// _id, artist, venue, date, description, posts { _id, user, postText}
// Create a component for every post in that conert, and have it receive the posts information (object) as props