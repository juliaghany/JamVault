import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PostModal = ({show, handleClose, concert}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Posts for {concert.artist} at {concert.venue}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {concert.posts.map((post, postIndex) => (
                    <div key={"post-"+postIndex}>
                        <h3>{post.user.username}</h3>
                        <p>{post.review}</p>
                        {post.media && post.media.map((url, idx) => 
                          <img key={idx} src={url} alt={`post-${postIndex}-media-${idx}`} style={{maxWidth: '100%'}}/>)
                        }
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PostModal;
