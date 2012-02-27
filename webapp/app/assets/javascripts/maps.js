$(function(){
  if ( $("#new_text").length != 0 ) {
    // https://github.com/apneadiving/Google-Maps-for-Rails/wiki/Javascript-goodies
    // manejo del mapa en el formulario con click y drag de marker y busqueda
    var markersArray = [];
    // On click, clear markers, place a new one, update coordinates in the form
    Gmaps.map.callback = function() {
        google.maps.event.addListener(Gmaps.map.map, 'click', function(event) {
          clearOverlays();
          placeMarker(event.latLng);
          updateFormLocation(event.latLng);
        });
    };
    // Update form attributes with given coordinates
    function updateFormLocation(latLng) {
        $('location_attributes_latitude').value = latLng.lat();
        $('location_attributes_longitude').value = latLng.lng();
        $('location_attributes_gmaps_zoom').value = Gmaps.map.map.getZoom();
    }
    // Add a marker with an open infowindow
    function placeMarker(latLng) {
        var marker = new google.maps.Marker({
            position: latLng, 
            map: Gmaps.map.map,
            draggable: true
        });
        markersArray.push(marker);
        // Listen to drag & drop
        google.maps.event.addListener(marker, 'dragend', function() {
            updateFormLocation(this.getPosition());
        });
    }
    // Removes the overlays from the map
    function clearOverlays() {
      if (markersArray) {
        for (var i = 0; i < markersArray.length; i++ ) {
          markersArray[i].setMap(null);
        }
      }
      markersArray.length = 0;
    }

    // Busqueda de un nodo
    var $street = $("#text_street"); 
    function searchMap() {
      $("body").css("cursor", "progress");
      $.getJSON('/maps/search/' + $street.val() , function(data){
        var latlng = new google.maps.LatLng(data[0].lat, data[0].lng);
        clearOverlays();
        placeMarker(latlng);
        updateFormLocation(latlng);
        Gmaps.map.map.panTo(latlng);
        $("body").css("cursor", "auto");
      });
    }
    $('#maps_search').click(function(e){
      e.preventDefault();
      searchMap();
    });
    // deshabilitamos la opcion por defecto del enter, que o sino intenta de submitear el form
    $street.bind('keypress', function(e) {
      if(e.keyCode==13){
        e.preventDefault();
        searchMap();
      }
    });
  }
});
