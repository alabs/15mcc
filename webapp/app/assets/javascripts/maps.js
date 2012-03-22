$(function(){
  if ( $(".content-form").length != 0 ) {
    // https://github.com/apneadiving/Google-Maps-for-Rails/wiki/Javascript-goodies
    // manejo del mapa en el formulario con click y drag de marker y busqueda
    var markersArray = [];
    // On click, clear markers, place a new one, update coordinates in the form
    // TODO: actualizar en el cuadro de busqueda
    // Gmaps.map.callback = function() {
    //     google.maps.event.addListener(Gmaps.map.map, 'click', function(event) {
    //       clearOverlays();
    //       placeMarker(event.latLng);
    //       updateFormLocation(event.latLng);
    //     });
    // };
    // Update form attributes with given coordinates
    function updateFormLocation(latLng) {
        $('.location_attributes_latitude').attr('value', latLng.lat());
        $('.location_attributes_longitude').attr('value', latLng.lng());
    }
    // Add a marker with an open infowindow
    function placeMarker(latLng) {
        var marker = new google.maps.Marker({
            position: latLng, 
            map: Gmaps.map.map
        //    draggable: true
        });
        markersArray.push(marker);
        // TODO: actualizar en cuadro de busqueda
        // Listen to drag & drop
        //google.maps.event.addListener(marker, 'dragend', function() {
        //    updateFormLocation(this.getPosition());
        //});
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
    var $address = $("#map-address"); 
    var $city = $("#map-city"); 
    var $country = $("#map-country"); 

    function searchMap() {

      // si city o country estan vacios, mostramos el error
      if ( $city.val() == "" ) { $city.parent().parent().addClass('error'); return false; }; 
      if ( $country.val() == "" ) { $country.parent().parent().addClass('error'); return false; }; 

      // mostramos el progreso, hacemos la peticion y lo pintamos en el mapa
      $("body").css("cursor", "progress");
      $city.parent().parent().removeClass('error');
      $country.parent().parent().removeClass('error');
      $.getJSON('/maps/search/' + $address.val() + ' ' + $city.val() + ' ' + $country.val(), function(data){
        var latlng = new google.maps.LatLng(data[0].lat, data[0].lng);
        clearOverlays();
        placeMarker(latlng);
        updateFormLocation(latlng);
        // zoom por defecto, se ve la ciudad
        var zoom = 7; 
        // si hay puesta una direccion, hacemos zoom a la calle
        if ( $address.val() != "" ) { zoom = 15 } ; 
        Gmaps.map.map.setZoom(zoom);
        Gmaps.map.map.panTo(latlng);
        $("body").css("cursor", "auto");
      });
    }

    $('#map-search').click(function(e){ e.preventDefault(); searchMap(); });

    // deshabilitamos la opcion por defecto del enter, que o sino intenta de submitear el form
    $address.bind('keypress', function(e) { if(e.keyCode==13){ e.preventDefault(); searchMap(); } });
    $city.bind('keypress', function(e) { if(e.keyCode==13){ e.preventDefault(); searchMap(); } });
    $country.bind('keypress', function(e) { if(e.keyCode==13){ e.preventDefault(); searchMap(); } });

  }
});
