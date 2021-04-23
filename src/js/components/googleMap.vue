<template>
  <div>
    <div ref="googleMap" class="google-map"></div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    locations: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      bounds: new google.maps.LatLngBounds(), // Авто масштабирование карты
      mapOptions: {
        center: { lat:  50.409105, lng: 30.359184 },
        zoomControl: true,
        zoom: 15,
        gestureHandling: "cooperative",
      },
    };
  },
  methods: {
    initMap() {
      const { imgClusterUrl, locations } = this.locations;
      // create map
      const map = new google.maps.Map(this.$refs.googleMap, {
        ...this.mapOptions,
      });

      // create Markers
      let markers = locations.map((location) => {
        // set locations for auto zoom map
        const setLocations = new google.maps.LatLng(location.lat, location.lng);
        this.bounds.extend(setLocations);

        // set Markers on Map
        return new google.maps.Marker({
          position: location,
          map: map,
          label: location.name_point,
          title: location.title + " " + location.name_point,
        });
      });

      // create MarkerClusterer and add Image
      // let markerCluster = new MarkerClusterer(
      //   map,
      //   markers,

      //   { imagePath: imgClusterUrl }
      // );

      // авто масштабирование
      map.fitBounds(this.bounds);
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>