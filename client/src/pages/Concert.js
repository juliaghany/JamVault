import React from "react";
import { Card } from 'react-bootstrap';
import SavedConcertList from "../components/SavedConcertList";
import { useQuery } from "@apollo/client";
import { QUERY_CONCERTS } from "../utils/queries";
import '../styles/Concert.css';

const Concert = () => {

    const { loading, data } = useQuery(QUERY_CONCERTS)
    const concerts = data?.concerts || []

  return (
    <div className="concert-content">
        <Card>
            {loading ? (
                <div>loading...</div>
            ) : (
                <SavedConcertList concerts={concerts} title="Saved Concerts" />
            )}
        </Card>
    </div>
  );
};

export default Concert;