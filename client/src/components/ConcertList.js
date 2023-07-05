import React, { useState } from 'react';
import PostForm from './PostForm';

const ConcertList = ({ results }) => {
  const [selectedConcert, setSelectedConcert] = useState(null);

  const handleSelectConcert = (concert) => {
    setSelectedConcert(concert);
  };

  return (
    <div>
      {results.map((concert, index) => (
        <div key={index} onClick={() => handleSelectConcert(concert)}>
          <h2>{concert.artist}</h2>
          <p>{concert.date}</p>
          <p>{concert.city}, {concert.country}</p>
          <p>Venue: {concert.venue}</p>
        </div>
      ))}
      {selectedConcert && <PostForm concert={selectedConcert} />}
    </div>
  );
};

export default ConcertList;