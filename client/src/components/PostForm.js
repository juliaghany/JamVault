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
    const [submitStatus, setSubmitStatus] = useState('');

    const { data: concertData, error: queryError, loading: queryLoading } = useQuery(CONCERT_BY_DESCRIPTION, {
        variables: { description: concert.description },
        skip: !concert.description,
    });

    const [addConcert] = useMutation(ADD_CONCERT);
    const [addPost] = useMutation(ADD_POST);
    const [concertId, setConcertId] = useState(null);

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
                addConcert({ variables: { ...concert } })
                    .then(({ data }) => {
                        console.log('Concert successfully added to database');
                        setConcertId(data.addConcert._id);
                    })
                    .catch((err) => console.error('Error adding concert to database:', err));
            } else {
                setConcertId(concertData?.concertByDescription?._id);
            }
        }
    }, [queryLoading, queryError, concertData, addConcert, concert]);    
      
    const randomFunction = (mediaPath) => {console.log("random function", mediaPath)}

    const handleMedia = (mediaFile) => {
        console.log("media file", mediaFile)
        setMediaFiles(oldMediaFiles => [...oldMediaFiles, mediaFile]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        console.log({review,mediaFiles})
        console.log(window.lastUploadingFile)
    // is this the line of code we need to modify so that the user can make a post without a photo?
        if (review.length===0 || !window.lastUploadingFile) {
            setError('Please enter all required fields.');
            return;
        }
    
        try {
            setIsSubmitting(true);
            setSubmitStatus('loading');

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
            
            console.log("concertId:", concertId);
            await addPost({ variables: { concertId, review, media: uploadedUrls } });
    
            setSubmitStatus('success');
            setError('');
        } catch (error) {
            console.log(error);
            setError('An error occurred. Please try again.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };       

    return (
        <Modal show={isModalOpen} onHide={() => { onClose(); setSubmitStatus(''); }}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: "bold" }}>Share your experience</Modal.Title>
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
                        <Form.Label style={{ fontWeight: "bold", textAlign: "center", display: "block" }}></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={review}
                            onChange={(event) => setReview(event.target.value)}
                            placeholder="Write your review here..."
                        />
                    </Form.Group>

                    <MediaUpload onMediaSelected={handleMedia} findMediaPath={randomFunction}/>

                    <Button variant="dark" type="submit" style={{ width: '100%', marginTop: '1rem' }}>Post</Button>
                    {isSubmitting && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {submitStatus === 'loading' && <p>Submitting...</p>}
                    {submitStatus === 'success' && <p>Your post was successfully submitted!</p>}
                    {submitStatus === 'error' && <p>An error occurred while submitting your post. Please try again.</p>}
                </Form>
            </Modal.Body>
        </Modal>
    );
};


export default PostForm;