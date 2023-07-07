import React, { useState } from 'react';

const SearchForm = ({ setResults }) => {
  const [artist, setArtist] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch(`/api/search?artist=${encodeURIComponent(artist)}&minDate=${encodeURIComponent(minDate)}&maxDate=${encodeURIComponent(maxDate)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const concerts = data.data.map(concert => ({
          description: concert.description,  
          artist: concert.name,
          date: concert.startDate,
          city: concert.location.address.addressLocality,
          country: concert.location.address.addressCountry,
          venue: concert.location.name,
          image: concert.image
        }));
        setResults(concerts);
      })
      .catch((error) => {
        setError("An error occurred while fetching data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist"/>
      <input type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date"/>
      <input type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date"/>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;