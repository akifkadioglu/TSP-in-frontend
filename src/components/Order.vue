<template>
  <div>
    <div class="bg-black full-screen opacity-50" />
    <div class="flex full-screen justify-center items-center h-80">
      <div class="w-80">
        <div
          class="bg-white shadow-md rounded py-3 px-2 space-y-3"
          style="max-height: 20rem; overflow: auto"
        >
          <div v-for="(item, index) in list" :key="index">
            {{ index }}-) {{ item }}
          </div>
          <hr />
          <div>Toplam Yol: {{ finalDistance.toFixed(2) }} Km</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* imports */
import store from "../store";
import { onMounted, ref } from "vue";

/* data */
const list = ref([]);
const finalDistance = ref(0);

/* mounted */
onMounted(() => {
  let matrix = [];
  let term = [];
  if (store.state.locations.length == 0) return;
  for (let i = 0; i < store.state.locations.length; i++) {
    term = [];
    for (let k = 0; k < store.state.locations.length; k++) {
      if (i != k) {
        let a = store.state.locations[i];
        let b = store.state.locations[k];

        term.push(
          kmCalculator(
            a.coordinates.lat,
            a.coordinates.lng,
            b.coordinates.lat,
            b.coordinates.lng
          )
        );
      } else {
        term.push(0);
      }
    }
    matrix.push(term);
  }
  const startCity = 0;
  const shortestPath = findShortestPathWithStart(matrix, startCity);
  const shortestDistance = calculateTotalDistance(shortestPath, matrix);
  finalDistance.value = shortestDistance;
  shortestPath.forEach((index) => {
    list.value.push(store.state.locations[index].name);
  });
});

/* methods */
function kmCalculator(lat1, lng1, lat2, lng2) {
  const R = 6371.0;

  const radLat1 = (Math.PI / 180) * lat1;
  const radLng1 = (Math.PI / 180) * lng1;
  const radLat2 = (Math.PI / 180) * lat2;
  const radLng2 = (Math.PI / 180) * lng2;

  const dLng = radLng2 - radLng1;
  const dLat = radLat2 - radLat1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

function calculateTotalDistance(path, distances) {
  let totalDistance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];
    totalDistance += distances[from][to];
  }
  return totalDistance;
}

function findShortestPathWithStart(distances, startCity) {
  const numCities = distances.length;
  const cities = [...Array(numCities).keys()];
  const remainingCities = cities.filter((city) => city !== startCity);

  let shortestPath = [startCity];
  let shortestDistance = Infinity;

  function permute(arr, m = []) {
    if (arr.length === 0) {
      const path = [startCity, ...m];
      const distance = calculateTotalDistance(path, distances);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestPath = path;
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr, m.concat(next));
      }
    }
  }

  permute(remainingCities);
  return shortestPath;
}
</script>
