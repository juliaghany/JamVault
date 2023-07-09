import React, { useState } from 'react';
import PostForm from './PostForm';
import { Card, Button } from 'react-bootstrap';

const ConcertList = ({ results }) => {
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectConcert = (concert) => {
    //setSelectedConcert(concert);
    setSelectedConcert({ ...concert, description: concert.description });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center" style={{ marginBottom: '60px'}}>
      {results.map((concert, index) => {
        const date = new Date(concert.date);
        const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
        return (
          <Card key={"concert-card-"+index} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={concert.image} />
            <Card.Body>
              <Card.Title>{`${concert.artist} at ${concert.venue}`}</Card.Title>
              <Card.Text>
                {formattedDate} <br />
                {concert.city}, {concert.country}
              </Card.Text>
              <Button variant="primary" onClick={(event) => { event.preventDefault(); handleSelectConcert(concert) }}>Share Experience</Button>
            </Card.Body>
          </Card>
        );
      })}
      {selectedConcert && <PostForm concert={selectedConcert} onClose={handleCloseModal} isModalOpen={isModalOpen} />}
    </div>
  );
};

export default ConcertList;