"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issue with Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapEvents({ onLocationSelected }: { onLocationSelected: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelected(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function CenterMap({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export default function MapPicker({ 
  position, 
  onPositionChange,
  placeholder = "Select location on map"
}: { 
  position: { lat: number, lng: number } | null, 
  onPositionChange: (lat: number, lng: number) => void,
  placeholder?: string
}) {
  // Default center: Nairobi CBD
  const [center, setCenter] = useState({ lat: -1.286389, lng: 36.817223 });

  useEffect(() => {
    if (position) {
      setCenter(position);
    }
  }, [position]);

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-border">
      <MapContainer 
        key={placeholder}
        center={[center.lat, center.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onLocationSelected={onPositionChange} />
        {position && (
          <Marker position={[position.lat, position.lng]} icon={customIcon} />
        )}
        <CenterMap lat={center.lat} lng={center.lng} />
      </MapContainer>
    </div>
  );
}
