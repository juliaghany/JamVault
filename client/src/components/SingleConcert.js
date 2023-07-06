// SingleConcert.js
import React from "react";

const SingleConcert = ({ concert }) => {
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
          <img class="card-img" src=".../100px260/" alt="Card image" />
          <p class="card-text"><small class="text-muted">{concert.posts}</small></p>
        </div>
      </div>
    </div>
  );
};

export default SingleConcert