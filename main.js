import "@fontsource/roboto";
import "@fontsource/roboto-condensed";
import "@fontsource/roboto-flex";
import "@fontsource/roboto-serif";
import './src/stylesheets/style.css';
import 'ol/ol.css';
import initconfig from './src/config.js';
import netWorker from './src/workers/networker?worker';
import syncWorker from './src/workers/syncworker?worker';
import reqWorker from './src/workers/reqworker?worker';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import LayerSwitcher from 'ol-layerswitcher';
import OSM from 'ol/source/OSM.js';
import Icon from 'ol/style/Icon';
import { Circle as CircleStyle, RegularShape, Text, Fill, Stroke, Style } from 'ol/style.js';
import { defaults as defaultControls } from 'ol/control.js';
import { transform } from 'ol/proj.js';

if('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let registeredSW;
      if (import.meta.env?.DEV){
        registeredSW = await navigator.serviceWorker.register('./src/workers/service-worker.js', {
          type: 'module',
        });
      } else {
        registeredSW = await navigator.serviceWorker.register('/service-worker.js');
      }
      //console.log('Service worker registered! 😎', registeredSW);
    } catch (err){
      //console.log('😥 Service worker registration failed: ', err);
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const workers = [netWorker, syncWorker, reqWorker];
  const toggleSidebarBtn = document.querySelector('.mobile-menu-button');
  const prefsTogglerBtn = document.querySelector('.main-application-submenu-toggler');
  const sideBar = document.querySelector('.sidebar');
  const mainView = document.getElementById('mainview');
  const prefsSubmenus = document.getElementById('preferences-submenus');
  const collapseIcon = document.querySelector('.icon-collapse-updown');
  toggleSidebarBtn.addEventListener('click', () => {
    document.querySelector('.mobile-top-brand-nav').classList.toggle('hidden');
    document.querySelector('.slide-aside-button-icon').classList.toggle('button-forwardburger');
    document.querySelector('.slide-aside-button-icon').classList.toggle('button-backburger');
    setTimeout(() => {
      sideBar.classList.toggle('-translate-x-full');
      mainView.classList.toggle('hidden');
    }, 100);
  });
  prefsTogglerBtn.addEventListener('click', () => {
    prefsSubmenus.classList.toggle('hidden');
    prefsSubmenus.classList.toggle('-translate-y-full');
    collapseIcon.classList.toggle('rotate-180');
  });
  let map;
  const style = new Style({
    fill: new Fill({
      color: '#eeeeee',
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 2,
    }),
  });

  const basemap = new TileLayer({
    title: 'OSM',
    source: new OSM()
  });

  const BusRoutes = new VectorLayer({
    title: 'Bus Routes',
    source: new VectorSource({
      url: '../api/bus-routes',
      format: new GeoJSON(),
    }),
    style: function (feature, resolution) {
      console.log(resolution);
      if(feature.get('name') == 'Trans Jogja 1B'){
        style.getFill().setColor('#f4a2a6');
        style.getStroke().setColor('#f4a2a6');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 2B'){
        style.getFill().setColor('#a0cfeb');
        style.getStroke().setColor('#a0cfeb');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 3A'){
        style.getFill().setColor('#e36b00');
        style.getStroke().setColor('#e36b00');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 3B'){
        style.getFill().setColor('#ffae66');
        style.getStroke().setColor('#ffae66');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 4A'){
        style.getFill().setColor('#66ab08');
        style.getStroke().setColor('#66ab08');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 4B'){
        style.getFill().setColor('#c1d5a5');
        style.getStroke().setColor('#c1d5a5');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 5A'){
        style.getFill().setColor('#c1d5a5');
        style.getStroke().setColor('#c1d5a5');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 5B'){
        style.getFill().setColor('#c2a0dd');
        style.getStroke().setColor('#c2a0dd');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 6A'){
        style.getFill().setColor('#5c4137');
        style.getStroke().setColor('#5c4137');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 6B'){
        style.getFill().setColor('#a29590');
        style.getStroke().setColor('#a29590');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 7'){
        style.getFill().setColor('#9c1b13');
        style.getStroke().setColor('#9c1b13');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 8'){
        style.getFill().setColor('#005ea5');
        style.getStroke().setColor('#005ea5');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 9'){
        style.getFill().setColor('#40b6b5');
        style.getStroke().setColor('#40b6b5');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 10'){
        style.getFill().setColor('#f7c42f');
        style.getStroke().setColor('#f7c42f');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 11'){
        style.getFill().setColor('#c1d01b');
        style.getStroke().setColor('#c1d01b');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 13'){
        style.getFill().setColor('#bd9d3d');
        style.getStroke().setColor('#bd9d3d');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 14'){
        style.getFill().setColor('#457800');
        style.getStroke().setColor('#457800');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Trans Jogja 15'){
        style.getFill().setColor('#9c1b13');
        style.getStroke().setColor('#9c1b13');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Teman Bus K1J'){
        style.getFill().setColor('#e83d46');
        style.getStroke().setColor('#e83d46');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Teman Bus K2J'){
        style.getFill().setColor('#1a94d9');
        style.getStroke().setColor('#1a94d9');
        style.getStroke().setWidth(5);
        return style;
      } else if(feature.get('name') == 'Teman Bus K3J'){
        style.getFill().setColor('#a14d01');
        style.getStroke().setColor('#a14d01');
        style.getStroke().setWidth(5);
        return style;
      } else {
        style.getFill().setColor('#eeeeee');
        style.getStroke().setColor('#eeeeee');
        style.getStroke().setWidth(1);
        return style;
      }
    },
  });
  

  const BusStops = new VectorLayer({
    title: 'Bus Stops',
    source: new VectorSource({
      url: '../api/bus-stops',
      format: new GeoJSON(),
    }),
    style: function(feature) {
      const tipologi = feature.get('tipologi');
      let color;
      // Assign color based on 'tipologi' value
      switch (tipologi) {
        case 'Tipologi 1':
          color = '#ff1500'; // Red
          break;
        case 'Tipologi 2':
          color = '#ffa500'; // Orange
          break;
        case 'Tipologi 3':
          color = '#ffff00'; // Yellow
          break;
        case 'Tipologi 4':
          color = '#00ff00'; // Green
          break;
        case 'Tipologi 5':
          color = '#0000FF'; // Blue
          break;
      }
      
      
      const busStopStyle = new Style({
        image: new Icon({
          src: './assets/images/bus_stop-12.svg',
          imgSize: [12, 12],
          anchor: [0.5, 0.5],
          scale: 1.2,
          color: color
        })
      });
    // Get the current zoom level
    const zoomLevel = map.getView().getZoom();

    // Check if text style exists, otherwise create a new one
    let textStyle = busStopStyle.getText();
    if (!textStyle) {
      textStyle = new Text({
        fill: new Fill({ color: '#000000' }), // Set fill color to black
        stroke: new Stroke({ color: '#ffffff', width: 2 }), // Set stroke color to white with width 2
        font: 'bold 10px Arial',
        offsetX: 0,
        offsetY: -12 // Set offset for text label
      });
      busStopStyle.setText(textStyle);
    } else {
      textStyle.setFont('bold 10px Arial'); // Set font size to 10 pixels
    }

    // Set the label text based on the zoom level
    if (zoomLevel >= 15 && zoomLevel <= 25) {
      textStyle.setText(feature.get('nama'));
    } else {
      textStyle.setText('');
    }

      return busStopStyle;
    },
  });
  // Set the minimum zoom level for bus stops layer
  BusStops.setMinZoom(12.7);
  

  map = new Map({
    target: 'map',
    layers: [basemap, BusRoutes, BusStops],
    controls: defaultControls({zoom: false,}),
    view: new View({
      center: transform([110.367088, -7.782928], 'EPSG:4326','EPSG:3857'),
      zoom: 13
    })
  });

// Create layer switcher control
const layerSwitcher = new LayerSwitcher({
  target: document.querySelector('#layer-switcher'),
  show_progress: true,
  extent: true,
  trash: true,
  reverse: true,
  groupSelectStyle: 'group',
  activationMode: 'click'
});

// Add layers to layer switcher
map.addControl(layerSwitcher)
map.addLayer(BusRoutes);
map.addLayer(BusStops);


// Define the popup element
const popupElement = document.createElement('div');
popupElement.className = 'ol-popup';
document.body.appendChild(popupElement);

// Create an overlay to display the popup
const overlay = new Overlay({
  element: popupElement,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});
map.addOverlay(overlay);


/*
// Register a click event listener to the BusStops layer
BusStops.on('click', (event) => {
  const feature = event.target.getFeatures().getArray()[0];
  const tipologi = feature.get('tipologi');
  const rampa = feature.get('rampa');
  const parkir = feature.get('parkir');
  const petugas = feature.get('petugas');
  const kanopi = feature.get('kanopi');
  const photo = feature.get('photos');

  // Create the content for the popup
  let content = `<div><b>Tipologi:</b> ${tipologi}</div>`;
  content += `<div><b>Rampa:</b> ${rampa}</div>`;
  content += `<div><b>Parkir:</b> ${parkir}</div>`;
  content += `<div><b>Petugas:</b> ${petugas}</div>`;
  content += `<div><b>Kanopi:</b> ${kanopi}</div>`;
  content += `<div><b>Photos:</b> <img src="${photos}" width="100" height="100"></div>`; // Assuming 'photo' field contains image URL

  // Update the popup element's content and position
  popupContentElement.innerHTML = content;
  overlay.setPosition(event.coordinate);
  overlay.set('id', feature.getId()); // Optional: Set an ID to the overlay for further reference
}); */

// Define a function to create the popup content
function createBusRoutesPopupContent(properties) {
  // Specify the columns to be displayed in the popup for bus routes
  const columnsToShow = ["name", "operator"];
  // Create an array to store the HTML content for the popup
  const content = [];
  // Loop through each property and add it to the content array
  for (const key in properties) {
    if (properties.hasOwnProperty(key) && columnsToShow.includes(key)) {
      content.push(`<b>${key}:</b> ${properties[key]}`);
    }
  }
  // Join the content array with a horizontal line separator to create the HTML content for the popup
  const popupContent = content.join('<hr style="border-top: 1px solid black; margin: 5px 0;">');
  // Wrap the popup content in a div with custom CSS styles
  return `<div style="background-color: white; border: 1px solid black; padding: 10px;">${popupContent}</div>`;
}

// Define a function to create the popup content for bus stops
function createBusStopPopupContent(properties) {
  // Specify the columns to be displayed in the popup for bus stops
  const columnsToShow = ["nama", "tipologi", "rampa", "parkir", "petugas", "kanopi", "photos"];
  // Create an array to store the HTML content for the popup
  const content = [];
  // Loop through each property and add it to the content array if it is in the columnsToShow array
  for (const key in properties) {
    if (properties.hasOwnProperty(key) && columnsToShow.includes(key)) {
      if (key === "photos") {
        // Extract the "file" property from the "photos" column
        const photos = properties[key];
        // Loop through each photo and create an anchor element with a target="_blank" attribute to open in a new tab
        for (const photo of photos) {
          content.push(`<b>${key}:</b> <a href="${photo.file}" target="_blank"><img src="${photo.file}" alt="${photo.dir}" style="max-width: 200px; max-height: 150px;"></a>`);
        }
      } else {
        content.push(`<b>${key}:</b> ${properties[key]}`);
      }
    }
  }
  // Join the content array with a horizontal line separator to create the HTML content for the popup
  const popupContent = content.join('<hr style="border-top: 1px solid black; margin: 5px 0;">');
  // Wrap the popup content in a div with custom CSS styles
  return `<div style="background-color: white; border: 1px solid black; padding: 10px;">${popupContent}</div>`;
}




let popup; // Declare popup variable outside of event handler
let popup_route;

map.on('click', (evt) => {
  map.getOverlays().getArray().slice().forEach((overlay) => {
    map.removeOverlay(overlay);
  });
  
  const feature = map.forEachFeatureAtPixel(
    evt.pixel,
    (feature) => feature,
    {layerFilter: (layer) => layer === BusRoutes}
  );
  if (feature){
    // Get the properties of the feature
    const properties = feature.getProperties();
    // Create the popup content
    const content = createBusRoutesPopupContent(properties);
    // Create the popup overlay
    if (!popup_route) {
      popup_route = new Overlay({
        element: document.createElement('div'),
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      map.addOverlay(popup_route);
    }
    // Set the HTML content for the popup
    popup_route.getElement().innerHTML = content;
    // Set the position of the popup at the clicked pixel
    popup_route.setPosition(evt.coordinate);
  } else {
    // If no bus route feature is clicked, remove the popup
    if (popup_route) {
      map.removeOverlay(popup_route);
      popup_route = null;
    }
  }

  const bufferDistance = 15; // Define buffer distance in pixels

  const feature2 = map.forEachFeatureAtPixel(
    evt.pixel,
    (feature) => feature,
    {layerFilter: (layer) => layer === BusStops}
  );
  if (feature2){
    // Get the properties of the feature
    const properties = feature2.getProperties();
    // Create the popup content
    const content = createBusStopPopupContent(properties);
    if (!popup) {
      popup = new Overlay({
        element: document.createElement('div'),
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      map.addOverlay(popup);
    }
    // Set the HTML content for the popup
    popup.getElement().innerHTML = content;
    // Set the position of the popup at the clicked pixel
    popup.setPosition(evt.coordinate);
    // Add click event listener to photos in popup
    const photos = popup.getElement().getElementsByClassName('bus-stop-photo');
    Array.from(photos).forEach(photo => {
      photo.addEventListener('click', () => {
        const url = photo.getAttribute('data-url');
        window.open(url, '_blank');
      });
    });
  } else {
    // If no bus route feature is clicked, remove the popup
    if (popup) {
      map.removeOverlay(popup);
      popup = null;
    }
  }

  // Check if bus stop feature is clicked within the buffer distance
  if (feature2 && popup && evt.type === 'singleclick') {
    const clickedPoint = evt.coordinate;
    const busStopPoint = feature2.getGeometry().getCoordinates();
    const distance = map
      .getPixelFromCoordinate(clickedPoint)
      .distanceTo(map.getPixelFromCoordinate(busStopPoint));
    if (distance > bufferDistance) {
      map.removeOverlay(popup);
      popup = null;
    }
  }  
});



  map.once('postrender', function(e){
    e.stopPropagation();
    this.updateSize();
    return false;
  });
  map.on('moveend', function(e){
    e.stopPropagation();
    this.updateSize();
    return false;
  });
}); 
