// // UserTimeline.js

import React, {useState} from "react";
import { Card } from 'react-bootstrap'

import PostList from "../components/PostList";

import { useQuery } from "@apollo/client";
import { QUERY_USER_POSTS } from "../utils/queries";

const userPosts = () => {
    const { loading, data } = useQuery(QUERY_USER_POSTS)

    const posts = data?.posts || []

    return (
        <>
        <Card>
            {loading ? (
                <div>loading...</div>
            ) : (
                <PostList
                posts= {posts}
                title="Oh all the places you've been"/>
            )
        }
        </Card>
        
        </>
    )
}

export default userPosts