import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PostForm = ({ concert, onClose, isModalOpen }) => {
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const post = {
      concertId: concert._id,
      review,
      photos,
      videos
    };
  
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        onClose();
    })
    .catch((error) => {
        console.log(error);
        alert('An error occurred. Please try again.');
    });
  };

  const handlePhotoChange = (event, index) => {
    const newPhotos = [...photos];
    newPhotos[index] = event.target.value;
    setPhotos(newPhotos);
  };

  const handleVideoChange = (event, index) => {
    const newVideos = [...videos];
    newVideos[index] = event.target.value;
    setVideos(newVideos);
  };

  const addPhotoField = () => {
    setPhotos([...photos, '']);
  };

  const addVideoField = () => {
    setVideos([...videos, '']);
  };

  return (
    <Modal show={isModalOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a post about {concert.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Concert Info</Form.Label>
        <Form.Control plaintext readOnly defaultValue={`${concert.title} by ${concert.artist} at ${concert.venue}, ${concert.city}, ${concert.country} on ${new Date(concert.date).toLocaleDateString()}`} />
        </Form.Group>

        <Form.Group>
        <Form.Label>Review</Form.Label>
        <Form.Control
            type="text"
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Write your review here..."
        />
        </Form.Group>
          {photos.map((photo, index) => (
            <Form.Group key={index}>
              <Form.Label>Photo URL {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={photo}
                onChange={(event) => handlePhotoChange(event, index)}
                placeholder="Photo URL"
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={addPhotoField}>Add another photo</Button>

          {videos.map((video, index) => (
            <Form.Group key={index}>
              <Form.Label>Video URL {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={video}
                onChange={(event) => handleVideoChange(event, index)}
                placeholder="Video URL"
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={addVideoField}>Add another video</Button>

          <Button variant="primary" type="submit">Post</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostForm;