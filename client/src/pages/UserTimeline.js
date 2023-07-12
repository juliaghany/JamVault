import React from "react";
import { Card } from 'react-bootstrap';
import PostList from "../components/PostList";
import { useQuery } from "@apollo/client";
import { QUERY_USER_POSTS } from "../utils/queries";
import Auth from '../utils/auth';

const UserTimeline = () => {
  const userId = Auth.getProfile().data._id;
  const { loading, data, error } = useQuery(QUERY_USER_POSTS, {
    variables: { userId }
  });

  console.log("userId: ", userId);
  console.log("loading: ", loading); 
  console.log("error: ", error); 
  console.log("data: ", data);


  if (error) {
    console.error("GraphQL error occurred while fetching user posts:", error);
  } 
  
  console.log("Fetched data:", data);  

  const posts = data?.userPosts || [];
  const concerts = data?.concerts || [];

  return (
    <>
      <Card>
        {loading ? (
          <div>loading...</div>
        ) : (
          <PostList posts={posts} concerts={concerts} title="Your Posts" />
        )}
      </Card>
    </>
  );
};

export default UserTimeline;