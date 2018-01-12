const markerParser = marker => {
  return Object.assign({}, marker, {
    position: {
      lat: marker.address.lat,
      lng: marker.address.lng
    }
  });
};

export default markerParser;
