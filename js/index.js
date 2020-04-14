
window.onload= function(){
  
  
}

var map;
var markers= [];
var inforWindow;


function initMap() {
    var losAngeles = {lat: 34.063380, lng: -118.358080};
    map = new google.maps.Map(document.getElementById('map'), {
      center: losAngeles,
      zoom: 13,
      mapTypeId: 'roadmap',
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });
    infoWindow= new google.maps.InfoWindow
    searchStores();
    // showStoresMarkers();
    // setOnClickListener();
  }

  // function setOnClickListener(){
  //   var storeElements = document.querySelectorAll('.store-contianer');
  //   for(var [index,storeElement] of storeElements.entries()){
  //     storeElement.addEventListener('click', function(){
  //       google.maps.event.trigger(markers[index], 'click');
  //     })  
  //   }  
  // }

  // function toggleBounce() {
  //   if (markers.getAnimation() !== null) {
  //     markers.setAnimation(null);
  //   } else {
  //     markers.setAnimation(google.maps.Animation.BOUNCE);
  //   }
  // }

  function searchStores(){
    var foundStores=[]
    var zipCode= document.getElementById('zip-code-input').value;
    console.log(zipCode);
    if (zipCode){
      for (var store of stores){
        var postal= store['address'] ['postalCode'].substring(0,5);
        if(postal == zipCode){
          foundStores.push(store);
        }
      }
    }else {
      foundStores= stores;
    }
    clearLocations();
    displayStores(foundStores);
    showStoresMarkers(foundStores);
    setOnClickListener();
  }

  function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }


  function setOnClickListener(){
    var storeElements= document.querySelectorAll('.store-contianer');
    storeElements.forEach(function (elem, index){
      elem.addEventListener('click',function(){
       new google.maps.event.trigger(markers[index], 'click');
      })
    })
  }


/* function setOnClickListener(){
    var storeElements= document.querySelectorAll('.store-container');
    for (var [index, storeElement] of storeElements.entries()){
      storeElement.addEventListener('click',function(){
      google.maps.event.trigger(markers[index], 'click')
      })
    }
  }*/

  /*function initMap() {
    var myLatLng = {lat: 34.063380, lng: -118.358080};
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }*/

  function displayStores(stores){
    var storesHtml= '';
    for(var [index,store] of stores.entries()){
      var address= store['addressLines']
      var phone= store['phoneNumber']
      var hour= store['hours']
      storesHtml+=`
      <div class="store-contianer">
          <div class="store-info-container">
              <div class="store-address">
                       <span>${address[0]}</span> 
                     <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-comtainer">
                    <div class="store-number">
                        ${index + 1}
                    </div>
          </div>
        </div>
      `
      document.querySelector('.stores-list').innerHTML = storesHtml;
    }
  }

  function showStoresMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    for( var [index, store] of stores.entries()){

      var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]);
      var name= store['name']
      var address= store['addressLines'][0];
      var phone= store['phoneNumber'];
      var openhours= store['openStatusText'];
      bounds.extend(latlng);
      createMarker(latlng,name,address,index + 1,openhours,phone);
    }

    map.fitBounds(bounds);
  }



 

  function createMarker(latlng, name, address,index,openhours,phone) {

    var html = `
                <div class="store-info-window">
                  <div class="store-info-name">
                    ${name}
                  </div>
                      <div class="store-info-status">
                        ${openhours}
                      </div>
                          <div class="store-info-address">
                          <img src="https://img.icons8.com/color/48/000000/visit.png"/>
                            ${address}
                          </div>
                              <div class="store-info-phone">
                              <img src="https://img.icons8.com/color/48/000000/android.png"/>
                                ${phone}
                              </div>
                </div>
                `;
    var image = 'https://img.icons8.com/color/48/000000/coffee-to-go.png';
    var marker = new google.maps.Marker({
      map: map,
      icon:image,
      position: latlng,
      label: index.toString(),
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
   
    //marker.addListener('click', toggleBounce);

    markers.push(marker);
    

  }

