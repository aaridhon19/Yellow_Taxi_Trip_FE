import React, { useEffect, useState, useCallback } from 'react';
import MapView from './components/MapView';
import Filter from './components/Filters';
import { fetchAllTrips, fetchTripsFilter } from './services/api';
import './global.css';
import Swal from 'sweetalert2';
import Loading from './components/Loading';
import Legend from './components/Legend';

const App = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filters, setFilters] = useState({
    pickupTime: null,
    dropoffTime: null,
    fareRange: [0, 50],
    distanceRange: [0, 10],
    paymentType: null
  });
  const [loading, setLoading] = useState(false);
  const [filterKey, setFilterKey] = useState(0);

  useEffect(() => {
    const fetchInitialTrips = async () => {
      try {
        const data = await fetchAllTrips();
        setTrips(data);
        setFilteredTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchInitialTrips();
  }, []);

  const applyFilters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTripsFilter({
        payment_type: filters.paymentType,
        pickup_datetime: filters.pickupTime,
        dropoff_datetime: filters.dropoffTime,
        min_fare: filters.fareRange[0],
        max_fare: filters.fareRange[1],
        min_distance: filters.distanceRange[0],
        max_distance: filters.distanceRange[1],
      });
      setFilteredTrips(data);
    } catch (error) {
      handleFetchError();
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleFetchError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Sorry...',
      text: 'Trip Not Found',
    }).then(() => {
      resetFilters();
    });
  };

  const resetFilters = () => {
    setFilters({
      pickupTime: null,
      dropoffTime: null,
      fareRange: [0, 50],
      distanceRange: [0, 10],
      paymentType: null,
    });
    setFilteredTrips(trips);
    setFilterKey(prevKey => prevKey + 1); 
  };

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  return (
    <div className="app-container">
      <Filter key={filterKey} filters={filters} setFilters={setFilters} />
      {loading && <Loading />}
      <MapView trips={loading ? [] : filteredTrips} />
      <Legend />
    </div>
  );
};

export default App;