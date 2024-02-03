function handleFileUpload(input) {
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            console.log('File Content:', content);

            if (file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
                console.log('Handling GeoJSON...');
                handleGeoJSON(content);
            } else if (file.name.endsWith('.kml')) {
                console.log('Handling KML...');
                handleKML(content);
            } else if (file.name.endsWith('.shp')) {
                console.log('Shapefile upload is not yet implemented.');
            } else {
                console.log('Unsupported file format.');
            }
        };
        reader.readAsText(file);
    }
}
