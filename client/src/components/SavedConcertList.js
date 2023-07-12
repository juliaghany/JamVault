import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PostModal from './PostModal';

const SavedConcertList = ({ concerts }) => {
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectConcert = (concert) => {
    setSelectedConcert(concert);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center" style={{ marginBottom: '60px'}}>
        {concerts.map((concert, index) => {
            const date = new Date(concert.date);
            const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
            return (
                <Card key={"concert-card-"+index} style={{ width: '18rem', margin: '1rem' }}>
                    <Card.Img variant="top" src={concert.image} />
                    <Card.Body>
                        <Card.Title>{`${concert.venue}`}</Card.Title>
                        <Card.Text>
                            {formattedDate} <br />
                            {concert.city}, {concert.country}
                        </Card.Text>
                        <Button variant="dark" onClick={() => handleSelectConcert(concert)} style={{ width: '100%' }}>See Posts!</Button>
                    </Card.Body>
                </Card>
            );
        })}
        {selectedConcert && <PostModal show={showModal} handleClose={handleCloseModal} concert={selectedConcert} />}
    </div>
);
};

export default SavedConcertList;