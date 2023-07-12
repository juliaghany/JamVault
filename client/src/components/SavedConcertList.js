import React, { useState } from 'react';
// import PostForm from './PostForm';
import { Card, Button } from 'react-bootstrap';

const SavedConcertList = ({ concerts }) => {
  const [selectedConcert, setSelectedConcert] = useState(null);

  const handleSelectConcert = (concert) => {
    //setSelectedConcert(concert);
    setSelectedConcert({ ...concert, concertId: concert._id });
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
                        {concert.posts.map((post, postIndex) => (
                            <div key={"post-"+postIndex}>
                                <h3>{post.user.username}</h3>
                                <p>{post.review}</p>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            );
        })}
        {/* {selectedConcert && <PostForm concert={selectedConcert} onClose={handleCloseModal} isModalOpen={isModalOpen} />} */}
    </div>
);
};

export default SavedConcertList;