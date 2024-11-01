import React from 'react';
import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { formatToIndonesianTime, getPolylineColor, getPaymentTypeLabel } from './utils'; 
import '../global.css';

const MapView = ({ trips }) => {
  const renderPolyline = (trip) => (
    <Polyline
      key={trip.id}
      positions={[
        [parseFloat(trip.pickup_latitude), parseFloat(trip.pickup_longitude)],
        [parseFloat(trip.dropoff_latitude), parseFloat(trip.dropoff_longitude)],
      ]}
      color={getPolylineColor(trip.payment_type)}
    >
      <Popup className="custom-popup">
        <div>
          <strong>Pickup Time :</strong> {formatToIndonesianTime(trip.pickup_datetime)}<br />
          <strong>Dropoff Time :</strong> {formatToIndonesianTime(trip.dropoff_datetime)}<br />
          <strong>Fare :</strong> $ {parseFloat(trip.fare_amount).toFixed(2)}<br />
          <strong>Distance:</strong> {(trip.trip_distance * 1.60934).toFixed(2)} km<br />
          <strong>Payment :</strong> {getPaymentTypeLabel(trip.payment_type)}
        </div>
      </Popup>
    </Polyline>
  );

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {trips.length > 0 && trips.map(renderPolyline)}
    </MapContainer>
  );
};

export default MapView;