import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Form, Button } from 'react-bootstrap';
import { ADD_CONCERT, ADD_POST } from '../utils/mutations';
import { CONCERT_BY_DESCRIPTION } from '../utils/queries';
import MediaUpload from './MediaUpload';
import '../styles/PostForm.css'
import { Row, Col } from 'react-bootstrap';

const PostForm = ({ concert, onClose, isModalOpen }) => {
    const [review, setReview] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { data: concertData, error: queryError, loading: queryLoading } = useQuery(CONCERT_BY_DESCRIPTION, {
        variables: { description: concert.description },
        skip: !concert.description,
    });

    const [addConcert] = useMutation(ADD_CONCERT);
    const [addPost] = useMutation(ADD_POST);

    useEffect(() => {
      if (queryLoading) {
        console.log('Query is loading');
      } else if (queryError) {
        console.error('Error from CONCERT_BY_DESCRIPTION query:', queryError);
      } else {
        console.log('Query completed', concertData);
        if (!concertData?.concertByDescription) {
          console.log('Concert not found in database, adding it now', concert);
          console.log("***** concert info after not found ****")
          console.log(concert)
            addConcert({ variables: concert })
              .then(() => console.log('Concert successfully added to database'))
              .catch((err) => console.error('Error adding concert to database:', err));
          }  
        }
      }, [concertData, queryLoading, queryError, addConcert, concert]);      

    const handleMedia = (mediaFile) => {
        setMediaFiles(oldMediaFiles => [...oldMediaFiles, mediaFile]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log({review,mediaFiles})
        console.log(window.lastUploadingFile)
      
        if (review.length===0 || !window.lastUploadingFile) {
          setError('Please enter all required fields.');
          return;
        }
      
        try {
          setIsSubmitting(true);
      
          let { data: newConcertData } = await addConcert({ variables: concert });
          let concertId = newConcertData?.addConcert?._id;

          console.log('New concert:', newConcertData?.addConcert);
          console.log('New concert ID:', concertId);
      
          const uploadedUrls = await Promise.all(
            mediaFiles.map(async mediaFile => {
              const formData = new FormData();
              formData.append('media', mediaFile);
      
              const response = await fetch("/uploads", {
                method:"POST",
                body: formData
              });
      
              if (!response.ok) throw new Error('Upload failed');
      
              const data = await response.json();
              return data.url;
            })
          );
      
          await addPost({ variables: { post: { concertId, review, media: uploadedUrls } } });
      
          onClose();
          setError('');
        } catch (error) {
          console.log(error);
          setError('An error occurred. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      };      

    return (
        <Modal show={isModalOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: "bold" }}>Write a post about this {concert.artist} show!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {[
                        { label: "Artist", value: concert.artist },
                        { label: "Venue", value: concert.venue },
                        { label: "City", value: concert.city },
                        { label: "Country", value: concert.country },
                        { label: "Date", value: new Date(concert.date).toLocaleDateString() },
                    ].map((field) => (
                        <Form.Group as={Row}>
                            <Form.Label column sm={2} style={{ fontWeight: "bold", textAlign: "right" }}>{field.label}:</Form.Label>
                            <Col sm={10}>
                                <Form.Control style={{ backgroundColor: "#e9ecef", borderColor: "#e9ecef" }} type="text" readOnly defaultValue={field.value} />
                            </Col>
                        </Form.Group>
                    ))}

                    <Form.Group>
                        <Form.Label style={{ fontWeight: "bold", textAlign: "center", display: "block" }}>Write your concert review!</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={review}
                            onChange={(event) => setReview(event.target.value)}
                            placeholder="Write your review here..."
                        />
                    </Form.Group>

                    <MediaUpload onMediaSelected={handleMedia} />

                    <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>Post</Button>
                    {isSubmitting && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </Form>
            </Modal.Body>
        </Modal>
    );
};


export default PostForm;
