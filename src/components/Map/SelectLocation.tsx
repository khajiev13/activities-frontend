// SelectLocation.tsx
import React, { useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import BaseMap from './BaseMap';
import * as maptilersdk from '@maptiler/sdk';
import lottie from 'lottie-web';
import animationDataLocationPin from '../../illustrations/location-pin.json';
import { SubmitLocation } from './SelectLocation/SubmitLocation';

const SelectLocation: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const markerRef = useRef<maptilersdk.Marker | null>(null);
  const popupRef = useRef<maptilersdk.Popup | null>(null);

  const handleMapLoad = (map: maptilersdk.Map) => {
    map.on('click', (e) => {
      setCoordinates([e.lngLat.lng, e.lngLat.lat]);

      // Remove the existing marker and popup
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (popupRef.current) {
        popupRef.current.remove();
      }

      // Create a new div for the marker
      const markerDiv = document.createElement('div');
      markerDiv.style.width = '40px';
      markerDiv.style.height = '40px';

      // Load the Lottie animation
      lottie.loadAnimation({
        container: markerDiv, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationDataLocationPin, // the path to the animation json
      });
      // Add a new marker at the clicked location
      markerRef.current = new maptilersdk.Marker({ element: markerDiv })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);

      // Add a new popup at the clicked location
      const PopupContent = <SubmitLocation />;
      const html = ReactDOMServer.renderToString(PopupContent);
      popupRef.current = new maptilersdk.Popup({ offset: [0, -25] })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setHTML(html)
        .addTo(map);
    });
    console.log(coordinates);
  };

  return <BaseMap onMapLoad={handleMapLoad} />;
};

export default SelectLocation;
