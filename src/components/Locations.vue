<template>
  <Transition>
    <div
      v-if="(store.state.locations.length > 0) & store.state.isLocationsOpen"
      class="locations"
      style="overflow-y: auto; overflow-x: hidden"
    >
      <div class="w-48" style="height: 22rem">
        <div class="border-black bg-white rounded-lg rounded-r p-4">
          <div class="space-y-5" style="min-height: 20rem">
            <div v-for="(item, index) in store.state.locations" :key="index">
              <div class="w-full flex text-sm items-center justify-between">
                <p class="text-gray-900 leading-none">{{ item.name }}</p>
                <button @click="removeElement(index)">
                  <mdicon name="close" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/* imports */
import store from "../store";

/* methods */
function removeElement(index) {
  store.state.locations.splice(index, 1);
}
</script>
<style scoped>
.locations {
  position: fixed;
  bottom: 20px;
  right: 10px;
}
</style>
