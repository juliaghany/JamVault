import React from "react";
import { Card } from 'react-bootstrap';
import { useQuery } from "@apollo/client";
import { QUERY_USER_POSTS } from "../utils/queries";
import Auth from '../utils/auth';
import PostList from '../components/PostList';

const Timeline = () => {
  const { loading, data } = useQuery(QUERY_USER_POSTS, {
    variables: { userId: Auth.getProfile().data._id }
  });

  const posts = data?.posts || [];

  console.log(data);
  console.log(posts);

  return (
    <>
      <Card>
        {loading ? (
          <div>loading...</div>
        ) : (
          <PostList posts={posts} />
        )}
      </Card>
    </>
  );
};

export default Timeline;

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
