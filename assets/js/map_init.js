// Initialize and add the map
function initMap() {
  // The location of Tramore
  var tramore = {
    lat: 52.160695,
    lng: -7.149439
  };
  // The map, centered at Tramore
  var map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 15,
    center: tramore
  });
  // The marker, positioned at Tramore
  var marker = new google.maps.Marker({
    position: tramore,
    map: map
  });
}
