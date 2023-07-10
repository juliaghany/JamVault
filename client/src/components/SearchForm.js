import React, { useState } from 'react';
import { ScaleLoader } from "react-spinners";

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
        console.log('Fetched concerts:', concerts);
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
    <div className="container-fluid py-5" style={{ marginTop: '240px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex flex-column flex-lg-row">
            <div className="mr-lg-3 mb-3 mb-lg-0" style={{ flex: '1', fontSize: '40px', margin: '5px', fontFamily: 'Raleway, sans- serif', }}>
              Discover unforgettable concert experiences and share your own; search for an artist and enter the start and end dates to find concerts within that period
            </div>
            <form className="text-center bg-white p-4 shadow" onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <input className="form-control form-control-lg mb-3" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
              </div>
              <div className="form-group mb-4">
                <input className="form-control form-control-lg mb-3" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date" />
              </div>
              <div className="form-group mb-4">
                <input className="form-control form-control-lg mb-3" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date" />
              </div>
              <button className="btn btn-dark btn-lg nav-btn" type="submit">Search</button>
              {isLoading && <ScaleLoader color="#F23D5E" />}
              {error && <div style={{ marginTop: '10px'}}>{error}</div>}

            </form>
  
            {/* {isLoading && <ScaleLoader color="#F23D5E" />} */}
            
            {/* {error && <div>Error: {error}</div>}
   */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

    // <form onSubmit={handleSubmit}>
    //   <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist"/>
    //   <input type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date"/>
    //   <input type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date"/>
    //   <button type="submit">Search</button>
    // </form>
    // <div className="container d-flex align-items-center justify-content-center vh-100">
    //   <div className="row justify-content-center">
    //     <div className="col-lg-8">
    //       <form className="text-center bg-light p-5 rounded shadow" onSubmit={handleSubmit}>
    //         <div className="form-group mb-4">
    //           <input className="form-control form-control-lg mb-3 col-lg-8" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
    //         </div>
    //         <div className="form-group mb-4">
    //           <input className="form-control form-control-lg mb-3 col-lg-4" type="date" value={minDate} onChange={(e) => setMinDate(e.target.value)} placeholder="Min Date" />
    //         </div>
    //         <div className="form-group mb-4">
    //           <input className="form-control form-control-lg mb-3 col-lg-4" type="date" value={maxDate} onChange={(e) => setMaxDate(e.target.value)} placeholder="Max Date" />
    //         </div>
    //         <button className="btn btn-primary btn-lg" type="submit">Search</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>