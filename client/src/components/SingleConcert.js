// SingleConcert.js
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CONCERT_POSTS } from "../utils/queries";

const SingleConcert = () => {

    const { concertDescription } = useParams();

    const { loading, data } = useQuery(QUERY_CONCERT_POSTS, {
        variables: { concertDescription: concertDescription}
    })

    const concertPost = data?.concertPost || {}

    if (loading) {
        return <div>Loading...</div>
    }

  return (
    <div>
      <div className="card">
        <div className="card-header bg-info">{concert.title}</div>
        <div className="description"> {concert.venue} </div>
        <div className="description"> {concert.city}</div>
        <div>
          <small>{concert.date}</small>
        </div>
      </div>
      <div className="card-columns">
        <div class="card">
          <img class="card-img" src={concertPost.media} alt="Card image" />
          <p class="card-text"><small class="text-muted">{concertPost.User.username}</small></p>
        </div>
      </div>
    </div>
  );
};

export default SingleConcert