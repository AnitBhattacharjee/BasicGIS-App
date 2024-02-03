var map = L.map('map').setView([0, 0], 2);

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri'
});

var baseLayers = {
    'OpenStreetMap': osmLayer,
    'Satellite Imagery': esriLayer
};

var layerControl = L.control.layers(baseLayers).addTo(map);

function addGeoJSONLayer(url, layerName, geometryType) {
    var geoJSONLayer = new L.GeoJSON.AJAX(url, {
        style: function (feature) {
            if (geometryType === 'Point') {
                return { color: 'blue' };
            } else if (geometryType === 'LineString') {
                return { color: 'red' };
            } else if (geometryType === 'Polygon') {
                return { fillColor: 'green', color: 'black' };
            }
        }
    });

    layerControl.addOverlay(geoJSONLayer, layerName);

    return geoJSONLayer;
}

var pointsLayer = addGeoJSONLayer('sample.geojson', 'Sample Points Layer', 'Point');
var linesLayer = addGeoJSONLayer('sample_lines.geojson', 'Sample Lines Layer', 'LineString');
var polygonsLayer = addGeoJSONLayer('sample_polygons.geojson', 'Sample Polygons Layer', 'Polygon');

var overlayGroup = L.layerGroup([pointsLayer, linesLayer, polygonsLayer]);
layerControl.addOverlay(overlayGroup, 'All GeoJSON Layers');

// Use Nominatim for geocoding
var geocoder = L.Control.Geocoder.nominatim();
var searchControl = L.Control.geocoder({
    geocoder: geocoder,
}).addTo(map);

searchControl.on('markgeocode', function (e) {
    var location = e.geocode.center;
    var marker = L.marker(location).addTo(map);
    map.setView(location, 14);
});

// Initialize Leaflet.draw
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
});

map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        // Handle edited layers
    });
});

map.on('draw:deleted', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        // Handle deleted layers
    });
});