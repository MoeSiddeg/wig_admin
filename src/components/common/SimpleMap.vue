<script setup>
import { ref, onMounted, watch } from 'vue'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ lat: 26.3, lng: 50.2 }),
  },
})

const emit = defineEmits(['update:modelValue'])

const mapContainer = ref(null)
let map = null
let marker = null

onMounted(() => {
  // Dynamically import Leaflet to avoid build issues
  import('leaflet').then((L) => {
    // Fix icon paths
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })

    // Initialize map
    map = L.map(mapContainer.value).setView([props.modelValue.lat, props.modelValue.lng], 13)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add marker
    marker = L.marker([props.modelValue.lat, props.modelValue.lng], {
      draggable: true,
    }).addTo(map)

    // Update position when marker is dragged
    marker.on('dragend', () => {
      const position = marker.getLatLng()
      emit('update:modelValue', {
        lat: position.lat,
        lng: position.lng,
      })
    })

    // Add click event to map
    map.on('click', (e) => {
      marker.setLatLng(e.latlng)
      emit('update:modelValue', {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      })
    })
  })
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (marker && newVal && map) {
      marker.setLatLng([newVal.lat, newVal.lng])
      map.setView([newVal.lat, newVal.lng])
    }
  },
  { deep: true }
)
</script>

<template>
  <div ref="mapContainer" class="simple-map"></div>
</template>

<style scoped>
.simple-map {
  width: 100%;
  height: 400px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .simple-map {
    height: 300px;
  }
}
</style>
