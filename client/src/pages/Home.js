import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import ConcertList from '../components/ConcertList';

const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <SearchForm setResults={setResults} />
      <ConcertList results={results} />
    </div>
  );
};

export default Home;
