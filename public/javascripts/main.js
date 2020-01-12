function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        scrollwheel: false,
        zoom: 8
      });

      var marker = new google.maps.Marker({
        position: {
          lat: center.lat,
          lng: center.lng
        },
        map: map,
        title: "Your current position"
      });
    }, function () {
      document.getElementById("map").innerHTML = "Error in the geolocation service.";
    });
  } else {
    document.getElementById("map").innerHTML = "Browser does not support geolocation.";
  }
}

$(document).ready(function () {
  $("#save").on("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        $.ajax({
          url: "/locations/create",
          method: "POST",
          data: {
            "location": center
          },
          dataType: "json",
          complete: function (res) {
            if (res.status === 201) {
              $("#save").attr("disabled", "disabled");
            }
          }
        });
      });
    }
  });
});
