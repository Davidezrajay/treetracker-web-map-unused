// Just getting map and trees

var map;
var tanzaniaTrees = [];

function initMap() {
  // var uluru = {lat: -25.363, lng: 131.044};
  // var tanzania = {lat: 6.49, lng: 39.16};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: -6, lng: 34},
    // mapTypeId: 'satellite',
    disableDefaultUI: true,
    zoomControl: true,
    
  }); 
  getTrees();
  if (tanzaniaTrees.length > 0) {
    console.log('initMap:' + tanzaniaTrees);
  }

  // placeMarkers();
  // this function never worked because the async getTrees was not yet completed
  // meaning it would run with no data, hence no markers were drawn on map
  // Therefore I put placeMarkers inside treesReq.onload and it worked! 
}

function getTrees() {
  var treesUrl = './trees.json';
  // var treesUrl = 'http://treetracker.org/trees/json/all';
  var treesReq = new XMLHttpRequest();
  treesReq.open('GET', treesUrl);
  // treesReq.responseType = 'json';
  treesReq.send();
  treesReq.onload = function() {
    var treeData = treesReq.response;
    console.log(treeData.length);
    var trees = JSON.parse(treeData);

    getTanzaniaTrees(trees); 
  }
}

// this gets called inside getTrees function
function getTanzaniaTrees(data) {
  
  for (var i = 0; i < data.length; i++) {
    if ((data[i].lat > -11.5 && data[i].lat < -1) && (data[i].lon < 40 && data[i].lon > 29)) {
      var tree = {};
      tree.lat = parseFloat(data[i].lat);
      tree.lng = parseFloat(data[i].lon);
      tanzaniaTrees.push(tree);
    }
  }
  console.log('Got trees in Tanzania!', tanzaniaTrees);
  placeMarkers();
}

// this gets called inside getTanzaniaTrees()
// I tried putting this inside the initMap function just below the call for getTrees() 
function placeMarkers() {
  console.log('adding markers...')
  var counter = 1
  for (var j = 0; j < tanzaniaTrees.length; j+= 10) {
    var marker = new google.maps.Marker({
      position: tanzaniaTrees[j],
      map: map,
      label: counter.toString()
    });
    // console.log('adding marker number ' + counter)
    // console.log(marker);
    counter++;
  }
}

// geocode stuff

function pressedEnter(event) {
  if (event.key === "Enter") {
    geocodeSearch("Enter pressed for ");
  }
} 

function geocodeSearch(message) {
  var place = document.getElementById("geocode-input").value;
  if (message) {
    console.log(message + place)
  } 
  else {
    console.log("button clicked for " + place);
  }

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': place}, function (results, status) {
    if (status === 'OK') {
      console.log(results);
      var center = results[0].geometry.viewport.getCenter();
      map.setCenter(center);
      console.log(center);
    }
  });
}