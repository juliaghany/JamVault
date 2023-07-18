import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PostModal from './PostModal';
import moment from 'moment'; // Import Moment.js

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
    <div className="d-flex flex-wrap justify-content-center" style={{ marginBottom: '60px' }}>
      {concerts.map((concert, index) => {
        const formattedDate = moment(concert.date).format('MMMM DD, YYYY');
        return (
          <Card key={"concert-card-" + index} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={concert.image} />
            <Card.Body>
              <Card.Title>{`${concert.venue}`}</Card.Title>
              <Card.Text>
                {formattedDate} <br />
                {concert.city}, {concert.country}
              </Card.Text>
              <Button variant="dark" onClick={() => handleSelectConcert(concert)} style={{ width: '100%' }}>View Posts</Button>
            </Card.Body>
          </Card>
        );
      })}
      {selectedConcert && <PostModal show={showModal} handleClose={handleCloseModal} concert={selectedConcert} />}
    </div>
  );
};

export default SavedConcertList;