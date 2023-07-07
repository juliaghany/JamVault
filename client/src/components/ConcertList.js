import React, { useState } from 'react';
import PostForm from './PostForm';

const ConcertList = ({ results }) => {
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectConcert = (concert) => {
    setSelectedConcert(concert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      {selectedConcert && <PostForm concert={selectedConcert} onClose={handleCloseModal} isModalOpen={isModalOpen} />}
    </div>
  );
};

export default ConcertList;