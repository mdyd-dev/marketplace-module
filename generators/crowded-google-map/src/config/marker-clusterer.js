const defaultClusterStyle = {
  textColor: 'white',
  textSize: 12,
  height: 50,
  width: 50
};

const config = {
  gridSize: 50,
  maxZoom: 14,
  styles: [
    Object.assign({}, defaultClusterStyle, {
      url: `${window.__cdnUrl()}images/gmap/small.png`
    }),
    Object.assign({}, defaultClusterStyle, {
      url: `${window.__cdnUrl()}images/gmap/medium.png`
    }),
    Object.assign({}, defaultClusterStyle, {
      url: `${window.__cdnUrl()}images/gmap/large.png`
    })
  ]
};

export default config;
