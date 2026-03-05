<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useMarkerStore } from '@/stores/marker.store'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppModal from '@/components/common/AppModal.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import SimpleMap from '@/components/common/SimpleMap.vue'
import { MapPin, Hotel, MapPinned, Plus, Trash2, Edit, Download } from 'lucide-vue-next'

const { t } = useLocale()
const markerStore = useMarkerStore()

const showModal = ref(false)
const editingMarker = ref(null)
const selectedPosition = ref({ lat: 26.3, lng: 50.2 })

const formData = reactive({
  type: 'hotel',
  title_en: '',
  title_ar: '',
  subtitle_en: '',
  subtitle_ar: '',
  venue_en: '',
  venue_ar: '',
  latitude: '',
  longitude: '',
  imageUrl: '',
  googleMapsUrl: '',
  reservationUrl: '',
  sports: [],
})

const sportForm = reactive({
  name_en: '',
  name_ar: '',
  iconUrl: '',
  sportType: 'general',
})

const activeTab = ref('all')

const sportTypeOptions = computed(() => [
  { value: 'general', label: t('map.sportTypes.general') },
  { value: 'firefighter', label: t('map.sportTypes.firefighter') }
])

const filteredMarkers = computed(() => {
  if (activeTab.value === 'hotels') return markerStore.hotels
  if (activeTab.value === 'venues') return markerStore.venues
  return markerStore.markers
})

const openAddModal = () => {
  resetForm()
  editingMarker.value = null
  showModal.value = true
}

const openEditModal = (marker) => {
  editingMarker.value = marker
  formData.type = marker.type
  formData.title_en = marker.title_en || ''
  formData.title_ar = marker.title_ar || ''
  formData.subtitle_en = marker.subtitle_en || ''
  formData.subtitle_ar = marker.subtitle_ar || ''
  formData.venue_en = marker.venue_en || ''
  formData.venue_ar = marker.venue_ar || ''
  formData.latitude = marker.position?.latitude.toString() || '26.3'
  formData.longitude = marker.position?.longitude.toString() || '50.2'
  formData.imageUrl = marker.imageUrl || ''
  formData.googleMapsUrl = marker.googleMapsUrl || ''
  formData.reservationUrl = marker.reservationUrl || ''
  formData.sports = marker.sports ? [...marker.sports] : []
  selectedPosition.value = {
    lat: marker.position?.latitude || 26.3,
    lng: marker.position?.longitude || 50.2,
  }
  showModal.value = true
}

const resetForm = () => {
  formData.type = 'hotel'
  formData.title_en = ''
  formData.title_ar = ''
  formData.subtitle_en = ''
  formData.subtitle_ar = ''
  formData.venue_en = ''
  formData.venue_ar = ''
  formData.latitude = '26.3'
  formData.longitude = '50.2'
  formData.imageUrl = ''
  formData.googleMapsUrl = ''
  formData.reservationUrl = ''
  formData.sports = []
  selectedPosition.value = { lat: 26.3, lng: 50.2 }
  resetSportForm()
}

const resetSportForm = () => {
  sportForm.name_en = ''
  sportForm.name_ar = ''
  sportForm.iconUrl = ''
  sportForm.sportType = 'general'
}

const addSport = () => {
  if (sportForm.name_en && sportForm.iconUrl) {
    formData.sports.push({
      name_en: sportForm.name_en,
      name_ar: sportForm.name_ar,
      iconUrl: sportForm.iconUrl,
      sportType: sportForm.sportType,
    })
    sportForm.name_en = ''
    sportForm.name_ar = ''
    sportForm.iconUrl = ''
    sportForm.sportType = 'general'
  }
}

const removeSport = (index) => {
  formData.sports.splice(index, 1)
}

const handleMapClick = () => {
  const lat = (26.3 + Math.random() * 0.1).toFixed(6)
  const lng = (50.2 + Math.random() * 0.1).toFixed(6)
  formData.latitude = lat
  formData.longitude = lng
  selectedPosition.value = { lat: parseFloat(lat), lng: parseFloat(lng) }
}

watch(selectedPosition, (newPos) => {
  if (newPos) {
    formData.latitude = newPos.lat.toFixed(6)
    formData.longitude = newPos.lng.toFixed(6)
  }
}, { deep: true })

watch([() => formData.latitude, () => formData.longitude], ([lat, lng]) => {
  if (lat && lng) {
    selectedPosition.value = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    }
  }
})

const saveMarker = () => {
  const markerData = {
    type: formData.type,
    title_en: formData.title_en,
    title_ar: formData.title_ar,
    subtitle_en: formData.subtitle_en,
    subtitle_ar: formData.subtitle_ar,
    venue_en: formData.venue_en,
    venue_ar: formData.venue_ar,
    position: {
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    },
    imageUrl: formData.imageUrl,
    googleMapsUrl: formData.googleMapsUrl,
    reservationUrl: formData.reservationUrl || null,
    sports: formData.sports.length > 0 ? formData.sports : null,
  }

  if (editingMarker.value) {
    markerStore.updateMarker(editingMarker.value.id, markerData)
  } else {
    markerStore.addMarker(markerData)
  }

  showModal.value = false
  resetForm()
}

const deleteMarker = (id) => {
  if (confirm(t('common.delete') + '?')) {
    markerStore.deleteMarker(id)
  }
}

const exportData = () => {
  const data = markerStore.exportData('en')
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `markers-${new Date().toISOString()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="map-view">
    <div class="map-view__header">
      <h1>{{ t('nav.map') }}</h1>
      <div class="map-view__actions">
        <AppButton @click="exportData" variant="secondary" size="sm">
          <Download :size="16" />
          {{ t('map.exportData') }}
        </AppButton>
        <AppButton @click="openAddModal">
          <Plus :size="16" />
          {{ t('map.addMarker') }}
        </AppButton>
      </div>
    </div>

    <div class="map-view__tabs">
      <button
        :class="['tab', { active: activeTab === 'all' }]"
        @click="activeTab = 'all'"
      >
        <MapPin :size="18" />
        {{ t('map.markers') }} ({{ markerStore.markers.length }})
      </button>
      <button
        :class="['tab', { active: activeTab === 'hotels' }]"
        @click="activeTab = 'hotels'"
      >
        <Hotel :size="18" />
        {{ t('map.hotels') }} ({{ markerStore.hotels.length }})
      </button>
      <button
        :class="['tab', { active: activeTab === 'venues' }]"
        @click="activeTab = 'venues'"
      >
        <MapPinned :size="18" />
        {{ t('map.venues') }} ({{ markerStore.venues.length }})
      </button>
    </div>

    <BaseCard>
      <div v-if="filteredMarkers.length === 0" class="empty-state">
        <MapPin :size="64" :stroke-width="1" />
        <p>{{ t('map.noMarkers') }}</p>
      </div>

      <div v-else class="markers-grid">
        <div
          v-for="marker in filteredMarkers"
          :key="marker.id"
          class="marker-card"
        >
          <div class="marker-card__header">
            <BaseBadge
              :label="marker.type === 'hotel' ? t('map.hotel') : t('map.venue')"
              :variant="marker.type === 'hotel' ? 'primary' : 'success'"
              pill
            />
            <div class="marker-card__actions">
              <button @click="openEditModal(marker)" class="icon-btn">
                <Edit :size="16" />
              </button>
              <button @click="deleteMarker(marker.id)" class="icon-btn danger">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>

          <h3>{{ marker.title_en }}</h3>
          <p class="subtitle">{{ marker.subtitle_en }}</p>
          <p class="venue">
            <MapPin :size="14" />
            {{ marker.venue_en }}
          </p>

          <div class="marker-card__position">
            <span>{{ marker.position.latitude.toFixed(6) }}, {{ marker.position.longitude.toFixed(6) }}</span>
          </div>

          <div v-if="marker.sports && marker.sports.length > 0" class="marker-card__sports">
            <div v-for="(sport, idx) in marker.sports" :key="idx" class="sport-tag">
              {{ sport.name_en }}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <AppModal v-model="showModal" :title="editingMarker ? t('map.editMarker') : t('map.addMarker')" width="800px">
      <form @submit.prevent="saveMarker" class="marker-form">
        <div class="form-group">
          <label>{{ t('map.markerType') }}</label>
          <select v-model="formData.type" class="form-select">
            <option value="hotel">{{ t('map.hotel') }}</option>
            <option value="venue">{{ t('map.venue') }}</option>
          </select>
        </div>

        <div class="form-row">
          <AppInput
            v-model="formData.title_en"
            :label="t('map.titleEn')"
            required
          />
          <AppInput
            v-model="formData.title_ar"
            :label="t('map.titleAr')"
            required
          />
        </div>

        <div class="form-row">
          <AppInput
            v-model="formData.subtitle_en"
            :label="t('map.subtitleEn')"
            required
          />
          <AppInput
            v-model="formData.subtitle_ar"
            :label="t('map.subtitleAr')"
            required
          />
        </div>

        <div class="form-row">
          <AppInput
            v-model="formData.venue_en"
            :label="t('map.venueEn')"
            required
          />
          <AppInput
            v-model="formData.venue_ar"
            :label="t('map.venueAr')"
            required
          />
        </div>

        <div class="map-picker">
          <label>{{ t('map.selectLocation') }}</label>
          <SimpleMap v-model="selectedPosition" />
          <p v-if="formData.latitude && formData.longitude" class="coordinates">
            {{ parseFloat(formData.latitude).toFixed(6) }}, {{ parseFloat(formData.longitude).toFixed(6) }}
          </p>
        </div>

        <div class="form-row">
          <AppInput
            v-model="formData.latitude"
            :label="t('map.latitude')"
            type="number"
            step="0.000001"
            required
          />
          <AppInput
            v-model="formData.longitude"
            :label="t('map.longitude')"
            type="number"
            step="0.000001"
            required
          />
        </div>

        <AppInput
          v-model="formData.imageUrl"
          :label="t('map.imageUrl')"
          type="url"
          required
        />

        <AppInput
          v-model="formData.googleMapsUrl"
          :label="t('map.googleMapsUrl')"
          type="url"
        />

        <AppInput
          v-if="formData.type === 'hotel'"
          v-model="formData.reservationUrl"
          :label="t('map.reservationUrl') + ' (' + t('map.optional') + ')'"
          type="url"
        />

        <div v-if="formData.type === 'venue'" class="sports-section">
          <h4>{{ t('map.addSport') }}</h4>
          
          <div class="sport-form">
            <div class="form-row">
              <AppInput
                v-model="sportForm.name_en"
                :label="t('map.sportNameEn')"
              />
              <AppInput
                v-model="sportForm.name_ar"
                :label="t('map.sportNameAr')"
              />
            </div>
            <AppInput
              v-model="sportForm.iconUrl"
              :label="t('map.sportIcon')"
              type="url"
            />
            <BaseSelect
              v-model="sportForm.sportType"
              :label="t('map.sportType')"
              :options="sportTypeOptions"
              placeholder="Select sport type"
            />
            <AppButton type="button" @click="addSport" variant="secondary" size="sm">
              <Plus :size="16" />
              {{ t('map.addSport') }}
            </AppButton>
          </div>

          <div v-if="formData.sports.length > 0" class="sports-list">
            <div v-for="(sport, idx) in formData.sports" :key="idx" class="sport-item">
              <span>{{ sport.name_en }} / {{ sport.name_ar }}</span>
              <button type="button" @click="removeSport(idx)" class="icon-btn danger">
                <Trash2 :size="14" />
              </button>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <AppButton type="button" @click="showModal = false" variant="secondary">
            {{ t('common.cancel') }}
          </AppButton>
          <AppButton type="submit">
            {{ t('common.save') }}
          </AppButton>
        </div>
      </form>
    </AppModal>
  </section>
</template>

<style scoped>
.map-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.map-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.map-view__header h1 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--color-text-dark);
}

.map-view__actions {
  display: flex;
  gap: 0.75rem;
}

.map-view__tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--color-border);
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--color-text-medium);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab:hover {
  color: var(--color-text-dark);
  background: var(--color-surface-variant);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-text-medium);
}

.empty-state svg {
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.markers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.marker-card {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: all 0.2s;
}

.marker-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.marker-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.marker-card__actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-medium);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: var(--color-surface-variant);
  color: var(--color-text-dark);
}

.icon-btn.danger:hover {
  background: var(--color-error-red);
  color: white;
  border-color: var(--color-error-red);
}

.marker-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  color: var(--color-text-dark);
}

.marker-card .subtitle {
  margin: 0 0 0.75rem;
  color: var(--color-text-gray);
  font-size: 0.9rem;
}

.marker-card .venue {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 1rem;
  color: var(--color-text-medium);
  font-size: 0.875rem;
}

.marker-card__position {
  padding: 0.5rem;
  background: var(--color-surface-variant);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  color: var(--color-text-medium);
  font-family: monospace;
  margin-bottom: 1rem;
}

.marker-card__sports {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sport-tag {
  padding: 0.35rem 0.75rem;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

.marker-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text-dark);
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-text-dark);
  font-size: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.map-picker {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.map-picker label {
  display: block;
  font-weight: 500;
  color: var(--color-text-dark);
}

.map-placeholder {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-surface-variant);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.map-placeholder:hover {
  border-color: var(--color-primary);
  background: rgba(45, 27, 107, 0.05);
}

.map-placeholder p {
  margin: 0;
  color: var(--color-text-medium);
  font-size: 0.9rem;
}

.map-placeholder .coordinates {
  font-family: monospace;
  font-weight: 600;
  color: var(--color-primary);
}

.map-picker .coordinates {
  margin: 0;
  padding: 0.5rem;
  background: var(--color-surface-variant);
  border-radius: var(--radius-sm);
  font-family: monospace;
  font-weight: 600;
  color: var(--color-primary);
  text-align: center;
  font-size: 0.9rem;
}

.sports-section {
  padding: 1rem;
  background: var(--color-surface-variant);
  border-radius: var(--radius-md);
}

.sports-section h4 {
  margin: 0 0 1rem;
  color: var(--color-text-dark);
}

.sport-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sports-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sport-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--color-white);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .map-view__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .map-view__actions {
    width: 100%;
    flex-direction: column;
  }

  .markers-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .map-view__tabs {
    overflow-x: auto;
  }

  .tab {
    white-space: nowrap;
  }
}
</style>
