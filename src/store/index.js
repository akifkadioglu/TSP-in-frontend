import { createStore } from 'vuex'

export default createStore({
    state: {
        locations: [],
        coordinates: { lat: 38.89648625960791, lng: 35.41592657142651 },
        isLocationAdding: false,
        isCalculateOpen: false,
        isLocationsOpen: true
    },
    mutations: {
        setCoordinates(state, { lat, lng }) {
            state.coordinates = { lat: lat, lng: lng }
        }
    },
    actions: {

    },
    getters: {

    }
})