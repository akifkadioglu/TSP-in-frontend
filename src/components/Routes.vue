<template>
  <Transition>
    <Add v-if="store.state.isLocationAdding" />
  </Transition>
  <div class="location-button">
    <button
      @click="store.state.isLocationAdding = !store.state.isLocationAdding"
      class="bg-gray-50 hover:bg-gray-200 text-black font-roboto text-lg py-1.5 px-5"
    >
      Lokasyon Ekle
    </button>
  </div>
  <div class="other-buttons">
    <div class="flex space-x-1">
      <button
        @click="store.state.isCalculateOpen = !store.state.isCalculateOpen"
        class="bg-gray-50 hover:bg-gray-200 text-black font-roboto text-lg py-1.5 px-5"
      >
        <mdicon
          v-if="store.state.isCalculateOpen"
          name="calculator-variant"
        />
        <mdicon v-else name="calculator-variant-outline" />
      </button>
      <button
        @click="store.state.isLocationsOpen = !store.state.isLocationsOpen"
        class="bg-gray-50 hover:bg-gray-200 text-black font-roboto text-lg py-1.5 px-5"
      >
        <mdicon v-if="store.state.isLocationsOpen" name="eye-outline" />
        <mdicon v-else name="eye-off-outline" />
      </button>
    </div>
  </div>
</template>

<script setup>
/* imports */
import store from "../store";
import Add from "./Add.vue";
</script>
<style scoped>
.location-button {
  position: fixed;
  top: 10px;
  right: 10px;
  font-weight: 450;
}
.other-buttons {
  position: fixed;
  top: 54px;
  right: 10px;
  font-weight: 450;
  z-index: 1;
}
</style>
