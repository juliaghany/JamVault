// UserTimeline.js

import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_POSTS } from "../utils/queries";

const userPosts = () => {

    const [userState, setUserState] = useState({
        media: ''
    })
    const { userId } = useParams()

    const { loading, data } = useQuery(QUERY_USER_POSTS,)
}