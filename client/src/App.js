import React, { useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Container from './components/Container';


const httpLink = createHttpLink({
    // uri: 'https://jamvault-3a4f37943c6d.app.com/graphql',
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const App = () => {

    const [currentPage, setCurrentPage] = useState('Home');

    const handlePageChange = (page) => setCurrentPage(page)

    return (
        <ApolloProvider client={client}>
            <div>
                <Container currentPage={currentPage} handlePageChange={handlePageChange} />
            </div>
        </ApolloProvider>
    )
}

export default App

// import MediaUpload from "./components/MediaUpload";

//     < div className = 'container mt-4' >

//     <h4 className='display-4 text-center mb-4 '>
//     <i className='fab fa-react'/>
//     React File Upload
//     </h4>

//     <MediaUpload />


// </div >