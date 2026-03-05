import { defineStore } from 'pinia'

export const useMarkerStore = defineStore('marker', {
  state: () => ({
    markers: [],
    selectedMarker: null,
    loading: false,
  }),
  
  getters: {
    hotels: (state) => state.markers.filter((m) => m.type === 'hotel'),
    venues: (state) => state.markers.filter((m) => m.type === 'venue'),
    
    getMarkerById: (state) => (id) => {
      return state.markers.find((m) => m.id === id)
    },
  },
  
  actions: {
    addMarker(marker) {
      const newMarker = {
        ...marker,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      this.markers.push(newMarker)
      return newMarker
    },
    
    updateMarker(id, updates) {
      const index = this.markers.findIndex((m) => m.id === id)
      if (index !== -1) {
        this.markers[index] = {
          ...this.markers[index],
          ...updates,
        }
      }
    },
    
    deleteMarker(id) {
      const index = this.markers.findIndex((m) => m.id === id)
      if (index !== -1) {
        this.markers.splice(index, 1)
      }
    },
    
    setSelectedMarker(marker) {
      this.selectedMarker = marker
    },
    
    clearSelectedMarker() {
      this.selectedMarker = null
    },
    
    exportData(language = 'en') {
      return {
        success: true,
        language,
        data: {
          markers: this.markers.map((marker) => ({
            id: marker.id,
            type: marker.type,
            title: marker[`title_${language}`] || marker.title,
            subtitle: marker[`subtitle_${language}`] || marker.subtitle,
            venue: marker[`venue_${language}`] || marker.venue,
            position: marker.position,
            imageUrl: marker.imageUrl,
            googleMapsUrl: marker.googleMapsUrl,
            reservationUrl: marker.reservationUrl || null,
            sports: marker.sports || null,
          })),
        },
        timestamp: new Date().toISOString(),
      }
    },
  },
})
