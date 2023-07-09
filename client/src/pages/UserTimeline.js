import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import PostList from "../components/PostList";
import { useQuery } from "@apollo/client";
import { QUERY_USER_POSTS } from "../utils/queries";
import Auth from '../utils/auth';

const UserPosts = () => {
  const { loading, data } = useQuery(QUERY_USER_POSTS);
  const posts = data?.posts || [];
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <Card>
        {loading ? (
          <div>loading...</div>
        ) : (
          <PostList posts={posts} title="Oh all the places you've been" />
        )}
      </Card>
    </>
  );
};

export default UserPosts;
