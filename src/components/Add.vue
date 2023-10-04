<template>
  <div>
    <div class="bg-black full-screen opacity-50" />
    <div class="flex full-screen justify-center items-center">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            İsim
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="İsim"
            maxlength="12" 
            v-model="name"
            @keyup.enter="addLocation"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="coordinates"
          >
            Koordinatlar
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coordinates"
            type="text"
            placeholder="Koordinatlar"
            v-model="coordinates"
            readonly
          />
        </div>
        <div>
          <button
            class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="addLocation"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
/* imports */
import store from "../store";
import { ref, onMounted } from "vue";

/* mounted */
onMounted(() => {
    document.getElementById("name")?.focus()


  coordinates.value =
    store.state.coordinates.lat + "," + store.state.coordinates.lng;
});

/* data */
const coordinates = ref(0);
const name = ref("");

/* methods */
function addLocation() {
  if (store.state.locations.length > 9) {
    alert("Çok büyük veri");
    return;
  }
  var newName = name.value;
  store.state.locations.push({
    name: newName,
    coordinates: {
      lat: store.state.coordinates.lat,
      lng: store.state.coordinates.lng,
    },
  });
  store.state.isLocationAdding = false;
}
</script>
