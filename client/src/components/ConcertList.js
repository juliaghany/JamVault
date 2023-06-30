const ConcertList = ({ results }) => {
    return (
      <div>
        {results.map((concert, index) => (
          <div key={index}>
            <img src={concert.image} alt={concert.artist} />
            <h2>{concert.artist}</h2>
            <p>{concert.date}</p>
            <p>{concert.city}, {concert.country}</p>
            <p>Venue: {concert.venue}</p>
          </div>
        ))}
      </div>
    );
  };
  
export default ConcertList;