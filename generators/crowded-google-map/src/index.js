import CrowdedGoogleMap from "crowded-google-map";

import googleMapsConfig from "./config/google-maps";
import markerClustererConfig from "./config/marker-clusterer";
import omsConfig from "./config/overlapping-marker-spiderifier";

import markerParser from "./markerParser";
import template from "./template";

const container = document.querySelector("[data-google-map='container']");

if (container) {
  const options = {
    container: container,
    googleMapsConfig: googleMapsConfig,
    clustererConfig: markerClustererConfig,
    spiderifyConfig: omsConfig,
    markersData: window.markers,
    parseMarkerData: markerParser,
    infoWindowConfig: template
  };

  new CrowdedGoogleMap(options);
}
