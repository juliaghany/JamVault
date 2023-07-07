import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Form, Button } from 'react-bootstrap';
import { CONCERT_BY_DESCRIPTION, ADD_CONCERT, ADD_POST } from '../utils/mutations';
import MediaUpload from './MediaUpload';

const PostForm = ({ concert, onClose, isModalOpen }) => {
    const [review, setReview] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { data: concertData } = useQuery(CONCERT_BY_DESCRIPTION, {
        variables: { description: concert.description },
        skip: !concert.description,
      });
      const [addConcert] = useMutation(ADD_CONCERT);
      const [addPost] = useMutation(ADD_POST);

    useEffect(() => {
        if (!concertData?.concertByDescription) {
            addConcert({ variables: { concert } });
        }
    }, [concertData, addConcert, concert]);

    const handleMedia = (mediaFile) => {
        setMediaFiles(oldMediaFiles => [...oldMediaFiles, mediaFile]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!review || !mediaFiles.length) {
            setError('Please enter all required fields.');
            return;
        }

        let concertId = concertData?.concertByDescription?._id;
        if (!concertId) {
            const { data: newConcertData } = await addConcert({
                variables: { concert },
            });
            concertId = newConcertData?.addConcert?._id;
        }

        try {
            setIsSubmitting(true);

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

            const photos = uploadedUrls.filter(url => url.endsWith('.jpg') || url.endsWith('.png'));
            const videos = uploadedUrls.filter(url => url.endsWith('.mp4') || url.endsWith('.avi'));

            await addPost({ variables: { post: { concertId, review, photos, videos } } });

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

                    <MediaUpload onMediaSelected={handleMedia} />

                    <Button variant="primary" type="submit">Post</Button>
                    {isSubmitting && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PostForm;
