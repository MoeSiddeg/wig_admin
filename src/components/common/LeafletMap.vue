<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

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
  // Initialize map centered on Al Khobar, Saudi Arabia
  map = L.map(mapContainer.value).setView([props.modelValue.lat, props.modelValue.lng], 13)

  // Add OpenStreetMap tiles (no API key required)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  // Add marker at initial position
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

  // Add click event to map to move marker
  map.on('click', (e) => {
    marker.setLatLng(e.latlng)
    emit('update:modelValue', {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    })
  })
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (marker && newVal) {
      marker.setLatLng([newVal.lat, newVal.lng])
      if (map) {
        map.setView([newVal.lat, newVal.lng])
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div ref="mapContainer" class="leaflet-map"></div>
</template>

<style scoped>
.leaflet-map {
  width: 100%;
  height: 400px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .leaflet-map {
    height: 300px;
  }
}
</style>
