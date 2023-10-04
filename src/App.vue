<template>
  <GoogleMap
    :api-key="key"
    style="width: 100%; height: 100vh"
    :center="center"
    :zoom="7"
    @click="markerClicked"
  >
    <Marker :options="{ position: { lat: myLat, lng: myLng } }" />
    <CustomMarker
      v-for="(item, index) in store.state.locations"
      :key="index"
      :options="{ position: item.coordinates }"
    >
      <div class="flex-col flex items-center">
        <div
          :style="
            index == 0
              ? 'background-color: #ff3300; color: white; font-size:16px'
              : ''
          "
          class="text-2sm bg-white px-4 py-2 rounded-3xl"
        >
          {{ item.name }}
        </div>
      </div>
    </CustomMarker>
  </GoogleMap>
  <Route />
  <Locations />
  <Transition>
    <Order v-if="store.state.isCalculateOpen" />
  </Transition>
</template>

<script setup>
/* imports */
import { ref } from "vue";
import { GoogleMap, Marker, CustomMarker } from "vue3-google-map";
import Route from "./components/Routes.vue";
import store from "./store";
import Locations from "./components/Locations.vue";
import Order from "./components/Order.vue";

/* data */
const center = { lat: 38.89648625960791, lng: 35.41592657142651 };
const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;
const myLat = ref(38.89648625960791);
const myLng = ref(35.41592657142651);

/* methods */
function markerClicked(event) {
  myLat.value = event.latLng.lat();
  myLng.value = event.latLng.lng();

  store.commit("setCoordinates", { lat: myLat.value, lng: myLng.value });
}
</script>
