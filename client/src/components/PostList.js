import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card } from 'react-bootstrap'

const styles = {
    span: {
        color: '#F26666',
        fontWeight: 'bold'
   }
}

const PostList = ({ posts }) => {
    if (!posts.length) {
        return <h3 style={{ textAlign: 'center', fontFamily: 'Raleway, sans- serif', marginTop: '175px' }}>Oh all the <span style={styles.span}>places</span> you've yet to be..</h3>
    }


    return (
        <div style={{ marginTop: '175px' }}>
            <h3 style={{ textAlign: 'center', fontFamily: 'Raleway, sans-serif', marginBottom: '50px' }}>
            Oh, the <span style={styles.span}>Places</span> You've Been...
            </h3>
            <div className="d-flex flex-wrap justify-content-center" style={{ marginBottom: '60px' }}>
                {posts.map((post) => {
                    const { artist, venue, date } = post.concert;
                    const dateTime = new Date(Number(date));
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }).format(dateTime);

                    return (
                        <Card key={post._id} style={{ width: '18rem', margin: '1rem' }}>
                            <Card.Img variant="top" src={post.media} alt={post.review} />
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }}><span style={{ fontWeight: 'bold' }}>{artist}</span> </Card.Title>
                                <Card.Text style={{ textAlign: 'center' }}>{venue} on {formattedDate}</Card.Text>
                                <hr></hr>
                                <Card.Text style={{ textAlign: 'center' }}>{post.review}</Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

export default PostList;

  // <div>
        //     <h3>Oh all the places you've been</h3>
        //     {posts &&
        //     posts.map((post) => (
        //         <div key={post._id} className="card mb-3">
        //             <p>Posted by: {post.user.username}</p>
        //             {/* <img src={post.media} alt={post.review}/> */}
        //             <img src={testImage} style={{ height: '100px', width: '100px'}} />
        //             <p>{post.review}</p>
        //             <p><small>{post.createdAt}</small></p>
        //         </div>
        //     ))
        //     }
        // </div>