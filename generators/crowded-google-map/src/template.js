const infoWindow = marker => {
  return {
    content: `Position: ${marker.position.lat}, ${marker.position.lng}`
  };
};

export default infoWindow;
