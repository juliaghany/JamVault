import React, { useState } from 'react';

const SearchForm = ({ setResults }) => {
  const [artist, setArtist] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/api/search?artist=${artist}&minDate=${minDate}&maxDate=${maxDate}`)
      .then((response) => response.json())
      .then((data) => {
        const concerts = data.data.map(concert => ({
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
        // add error handler
      });
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist"/>
    //   <input type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date"/>
    //   <input type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date"/>
    //   <button type="submit">Search</button>
    // </form>
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form className="text-center bg-light p-5 rounded shadow" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input className="form-control form-control-lg mb-3 col-lg-8" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
            </div>
            <div className="form-group mb-4">
              <input className="form-control form-control-lg mb-3 col-lg-4" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date" />
            </div>
            <div className="form-group mb-4">
              <input className="form-control form-control-lg mb-3 col-lg-4" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date" />
            </div>
            <button className="btn btn-primary btn-lg" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
      );
    };

export default SearchForm;