<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import BaseCard from '@/components/ui/BaseCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy,
  FileText,
  Building,
  Search,
  Filter,
  X
} from 'lucide-vue-next'

const { t } = useLocale()

// State
const sports = ref([])
const filteredSports = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const showHidden = ref(false)
const selectedSport = ref(null)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)

// Form data
const sportForm = ref({
  name: '',
  image: '',
  competitionDetails: {
    venue: '',
    dateOfEvent: ''
  },
  competition: {
    numberOfCompetitors: '',
    numberOfTeams: '',
    competitionDays: ''
  },
  governingBody: '',
  rulesAndRegulations: []
})

// Mock venues for dropdown
const venues = [
  { value: 'stadium1', label: 'National Stadium' },
  { value: 'stadium2', label: 'City Sports Complex' },
  { value: 'stadium3', label: 'University Arena' },
  { value: 'stadium4', label: 'Olympic Park' }
]

// Mock data
const mockSports = [
  {
    id: 1,
    name: 'Football',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400',
    isVisible: true,
    competitionDetails: {
      venue: 'stadium1',
      dateOfEvent: '2024-06-15'
    },
    competition: {
      numberOfCompetitors: 22,
      numberOfTeams: 2,
      competitionDays: 1
    },
    governingBody: 'FIFA',
    rulesAndRegulations: [
      { id: 1, text: '90 minutes playing time' },
      { id: 2, text: '11 players per team' },
      { id: 3, text: 'Offside rule applies' }
    ]
  },
  {
    id: 2,
    name: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    isVisible: true,
    competitionDetails: {
      venue: 'stadium2',
      dateOfEvent: '2024-07-20'
    },
    competition: {
      numberOfCompetitors: 10,
      numberOfTeams: 2,
      competitionDays: 1
    },
    governingBody: 'FIBA',
    rulesAndRegulations: [
      { id: 1, text: '4 quarters of 12 minutes' },
      { id: 2, text: '5 players per team' },
      { id: 3, text: '24-second shot clock' }
    ]
  },
  {
    id: 3,
    name: 'Tennis',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400',
    isVisible: false,
    competitionDetails: {
      venue: 'stadium3',
      dateOfEvent: '2024-08-10'
    },
    competition: {
      numberOfCompetitors: 2,
      numberOfTeams: 1,
      competitionDays: 2
    },
    governingBody: 'ITF',
    rulesAndRegulations: [
      { id: 1, text: 'Best of 3 sets' },
      { id: 2, text: '6 games per set' },
      { id: 3, text: 'Tie-break at 6-6' }
    ]
  }
]

// Computed
const computedSports = computed(() => {
  let filtered = sports.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(sport => 
      sport.name.toLowerCase().includes(query) ||
      sport.governingBody.toLowerCase().includes(query)
    )
  }

  // Show/hide filter
  if (!showHidden.value) {
    filtered = filtered.filter(sport => sport.isVisible)
  }

  return filtered
})

// Methods
const openAddModal = () => {
  resetForm()
  showAddModal.value = true
}

const openEditModal = (sport) => {
  selectedSport.value = sport
  sportForm.value = JSON.parse(JSON.stringify(sport))
  showEditModal.value = true
}

const openDetailsModal = (sport) => {
  selectedSport.value = sport
  showDetailsModal.value = true
}

const toggleVisibility = (sport) => {
  sport.isVisible = !sport.isVisible
}

const deleteSport = (sport) => {
  if (confirm(`Are you sure you want to delete ${sport.name}?`)) {
    const index = sports.value.findIndex(s => s.id === sport.id)
    sports.value.splice(index, 1)
  }
}

const saveSport = () => {
  if (showAddModal.value) {
    const newSport = {
      ...sportForm.value,
      id: Date.now(),
      isVisible: true
    }
    sports.value.push(newSport)
  } else {
    const index = sports.value.findIndex(s => s.id === selectedSport.value.id)
    sports.value[index] = sportForm.value
  }
  
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  showDetailsModal.value = false
  resetForm()
}

const resetForm = () => {
  sportForm.value = {
    name: '',
    image: '',
    competitionDetails: {
      venue: '',
      dateOfEvent: ''
    },
    competition: {
      numberOfCompetitors: '',
      numberOfTeams: '',
      competitionDays: ''
    },
    governingBody: '',
    rulesAndRegulations: []
  }
  selectedSport.value = null
}

const addRule = () => {
  const newRule = {
    id: Date.now(),
    text: ''
  }
  sportForm.value.rulesAndRegulations.push(newRule)
}

const removeRule = (index) => {
  sportForm.value.rulesAndRegulations.splice(index, 1)
}

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    sports.value = mockSports
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <section class="sports-view">
    <!-- Header -->
    <div class="sports-header">
      <div class="header-content">
        <div class="header-text">
          <h1>{{ t('sports.title') }}</h1>
          <p>{{ t('sports.subtitle') }}</p>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <Trophy :size="24" />
            <div class="stat-info">
              <span class="stat-number">{{ sports.length }}</span>
              <span class="stat-label">{{ t('nav.sports') }}</span>
            </div>
          </div>
          <div class="stat-item">
            <Eye :size="24" />
            <div class="stat-info">
              <span class="stat-number">{{ sports.filter(s => s.isVisible).length }}</span>
              <span class="stat-label">{{ t('sports.visible') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Bar -->
    <div class="actions-bar">
      <div class="search-filter">
        <div class="search-box">
          <Search :size="20" />
          <AppInput 
            v-model="searchQuery" 
            :placeholder="t('sports.searchPlaceholder')"
            class="search-input"
          />
        </div>
        <div class="filter-controls">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="showHidden"
              class="checkbox"
            />
            <span>{{ t('sports.showHidden') }}</span>
          </label>
        </div>
      </div>
      <AppButton @click="openAddModal" class="add-btn">
        <Plus :size="20" />
        {{ t('sports.addSport') }}
      </AppButton>
    </div>

    <!-- Sports Grid -->
    <div class="sports-grid">
      <BaseCard 
        v-for="sport in computedSports" 
        :key="sport.id"
        class="sport-card"
        :class="{ hidden: !sport.isVisible }"
      >
        <div class="sport-content">
          <div class="sport-image">
            <img :src="sport.image" :alt="sport.name" />
            <BaseBadge 
              :color="sport.isVisible ? 'green' : 'gray'"
              class="visibility-badge"
            >
              {{ sport.isVisible ? t('sports.visible') : t('sports.hidden') }}
            </BaseBadge>
          </div>
          
          <div class="sport-info">
            <h3>{{ sport.name }}</h3>
            <div class="sport-details">
              <div class="detail-item">
                <MapPin :size="16" />
                <span>{{ venues.find(v => v.value === sport.competitionDetails.venue)?.label }}</span>
              </div>
              <div class="detail-item">
                <Calendar :size="16" />
                <span>{{ sport.competitionDetails.dateOfEvent }}</span>
              </div>
              <div class="detail-item">
                <Users :size="16" />
                <span>{{ sport.competition.numberOfCompetitors }} competitors</span>
              </div>
              <div class="detail-item">
                <Trophy :size="16" />
                <span>{{ sport.competition.numberOfTeams }} teams</span>
              </div>
              <div class="detail-item">
                <Building :size="16" />
                <span>{{ sport.governingBody }}</span>
              </div>
            </div>
          </div>
          
          <div class="sport-actions">
            <AppButton 
              variant="secondary" 
              size="sm" 
              @click="openDetailsModal(sport)"
              class="action-btn"
            >
              <Eye :size="16" />
              {{ t('sports.viewDetails') }}
            </AppButton>
            <AppButton 
              variant="secondary" 
              size="sm" 
              @click="openEditModal(sport)"
              class="action-btn"
            >
              <Edit2 :size="16" />
              {{ t('common.edit') }}
            </AppButton>
            <AppButton 
              variant="secondary" 
              size="sm" 
              @click="toggleVisibility(sport)"
              class="action-btn"
            >
              <EyeOff v-if="sport.isVisible" :size="16" />
              <Eye v-else :size="16" />
              {{ sport.isVisible ? t('sports.hide') : t('sports.show') }}
            </AppButton>
            <AppButton 
              variant="danger" 
              size="sm" 
              @click="deleteSport(sport)"
              class="action-btn"
            >
              <Trash2 :size="16" />
              {{ t('common.delete') }}
            </AppButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Empty State -->
    <BaseCard v-if="computedSports.length === 0 && !isLoading" class="empty-state">
      <div class="empty-content">
        <Trophy :size="48" />
        <h3>{{ t('sports.noSports') }}</h3>
        <p>{{ t('sports.noSportsMessage') }}</p>
        <AppButton @click="openAddModal">
          <Plus :size="20" />
          {{ t('sports.addSport') }}
        </AppButton>
      </div>
    </BaseCard>

    <!-- Loading State -->
    <BaseCard v-if="isLoading" class="loading-state">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>{{ t('sports.loading') }}</p>
      </div>
    </BaseCard>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content sport-modal" @click.stop>
        <div class="modal-header">
          <h2>{{ showAddModal ? t('sports.addSport') : t('sports.editSport') }}</h2>
          <button @click="closeModal" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-section">
            <h3>{{ t('sports.basicInfo') }}</h3>
            <div class="form-grid">
              <AppInput 
                v-model="sportForm.name" 
                :label="t('sports.sportName')"
                :placeholder="t('sports.sportName')"
              />
              <AppInput 
                v-model="sportForm.image" 
                :label="t('sports.imageUrl')"
                :placeholder="t('sports.imageUrl')"
              />
            </div>
          </div>

          <div class="form-section">
            <h3>{{ t('sports.competitionDetails') }}</h3>
            <div class="form-grid">
              <BaseSelect 
                v-model="sportForm.competitionDetails.venue"
                :options="venues"
                :label="t('sports.venue')"
              />
              <AppInput 
                v-model="sportForm.competitionDetails.dateOfEvent" 
                type="date"
                :label="t('sports.dateOfEvent')"
              />
            </div>
          </div>

          <div class="form-section">
            <h3>{{ t('sports.competition') }}</h3>
            <div class="form-grid">
              <AppInput 
                v-model="sportForm.competition.numberOfCompetitors" 
                type="number"
                :label="t('sports.numberOfCompetitors')"
              />
              <AppInput 
                v-model="sportForm.competition.numberOfTeams" 
                type="number"
                :label="t('sports.numberOfTeams')"
              />
              <AppInput 
                v-model="sportForm.competition.competitionDays" 
                type="number"
                :label="t('sports.competitionDays')"
              />
            </div>
          </div>

          <div class="form-section">
            <h3>{{ t('sports.governingBody') }}</h3>
            <AppInput 
              v-model="sportForm.governingBody" 
              :label="t('sports.governingBody')"
              :placeholder="t('sports.governingBody')"
            />
          </div>

          <div class="form-section">
            <h3>{{ t('sports.rulesAndRegulations') }}</h3>
            <div class="rules-list">
              <div 
                v-for="(rule, index) in sportForm.rulesAndRegulations" 
                :key="rule.id"
                class="rule-item"
              >
                <AppInput 
                  v-model="rule.text" 
                  :placeholder="t('sports.enterRule')"
                />
                <AppButton 
                  variant="danger" 
                  size="sm" 
                  @click="removeRule(index)"
                >
                  <Trash2 :size="16" />
                </AppButton>
              </div>
              <AppButton variant="secondary" @click="addRule">
                <Plus :size="16" />
                {{ t('sports.addRule') }}
              </AppButton>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <AppButton variant="secondary" @click="closeModal">{{ t('common.cancel') }}</AppButton>
          <AppButton @click="saveSport">
            {{ showAddModal ? t('sports.create') : t('sports.update') }}
          </AppButton>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content details-modal" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedSport?.name }} {{ t('sports.sportDetails') }}</h2>
          <button @click="closeModal" class="close-btn">
            <X :size="20" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="detail-section">
            <div class="sport-image-large">
              <img :src="selectedSport?.image" :alt="selectedSport?.name" />
            </div>
            
            <div class="detail-grid">
              <div class="detail-group">
                <h4>{{ t('sports.basicInfo') }}</h4>
                <div class="detail-row">
                  <span class="label">{{ t('sports.name') }}:</span>
                  <span>{{ selectedSport?.name }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('sports.status') }}:</span>
                  <BaseBadge :color="selectedSport?.isVisible ? 'green' : 'gray'">
                    {{ selectedSport?.isVisible ? t('sports.visible') : t('sports.hidden') }}
                  </BaseBadge>
                </div>
              </div>

              <div class="detail-group">
                <h4>{{ t('sports.competitionDetails') }}</h4>
                <div class="detail-row">
                  <span class="label">{{ t('sports.venue') }}:</span>
                  <span>{{ venues.find(v => v.value === selectedSport?.competitionDetails.venue)?.label }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('sports.dateOfEvent') }}:</span>
                  <span>{{ selectedSport?.competitionDetails.dateOfEvent }}</span>
                </div>
              </div>

              <div class="detail-group">
                <h4>{{ t('sports.competition') }}</h4>
                <div class="detail-row">
                  <span class="label">{{ t('sports.competitors') }}:</span>
                  <span>{{ selectedSport?.competition.numberOfCompetitors }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('sports.teams') }}:</span>
                  <span>{{ selectedSport?.competition.numberOfTeams }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('sports.days') }}:</span>
                  <span>{{ selectedSport?.competition.competitionDays }}</span>
                </div>
              </div>

              <div class="detail-group">
                <h4>{{ t('sports.governingBody') }}</h4>
                <div class="detail-row">
                  <span class="label">{{ t('sports.organization') }}:</span>
                  <span>{{ selectedSport?.governingBody }}</span>
                </div>
              </div>

              <div class="detail-group">
                <h4>{{ t('sports.rulesAndRegulations') }}</h4>
                <div class="rules-details">
                  <div 
                    v-for="rule in selectedSport?.rulesAndRegulations" 
                    :key="rule.id"
                    class="rule-detail"
                  >
                    <FileText :size="16" />
                    <span>{{ rule.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sports-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

/* Header */
.sports-header {
  margin-bottom: 2rem;
}

.header-content {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-text h1 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.header-text p {
  font-size: 1rem;
  color: var(--color-text-medium);
  margin-bottom: 2rem;
}

.header-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-surface-variant);
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: var(--color-surface);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-dark);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Actions Bar */
.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-filter {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-surface-variant);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  flex: 1;
  max-width: 400px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
}

.filter-controls {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--color-text-medium);
}

.checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Sports Grid */
.sports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.sport-card {
  border: 1px solid var(--color-border);
  background: var(--color-white);
  transition: all 0.2s ease;
  overflow: hidden;
}

.sport-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.sport-card.hidden {
  opacity: 0.6;
  background: var(--color-surface-variant);
}

.sport-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sport-image {
  position: relative;
  height: 160px;
  overflow: hidden;
  background: var(--color-surface-variant);
}

.sport-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visibility-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.sport-info {
  padding: 0 1rem;
}

.sport-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
}

.sport-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-medium);
  font-size: 0.875rem;
}

.detail-item svg {
  flex-shrink: 0;
  opacity: 0.6;
}

.sport-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
}

/* Empty State */
.empty-state, .loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-content, .loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-content h3 {
  font-size: 1.5rem;
  color: var(--color-text-dark);
  margin: 0;
}

.empty-content p {
  color: var(--color-text-medium);
  margin: 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.sport-modal {
  max-width: 600px;
}

.details-modal {
  max-width: 900px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-white);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  position: relative;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.close-btn:active {
  transform: scale(0.95);
  background: rgba(239, 68, 68, 0.2);
}

.close-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}

/* Form Sections */
.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rule-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.rule-item input {
  flex: 1;
}

/* Details Modal */
.sport-image-large {
  height: 300px;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 2rem;
}

.sport-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.detail-group {
  background: var(--color-surface-variant);
  padding: 1.5rem;
  border-radius: var(--radius-md);
}

.detail-group h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  font-weight: 500;
  color: var(--color-text-medium);
}

.rules-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rule-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--color-white);
  border-radius: var(--radius-sm);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sports-view {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .header-stats {
    justify-content: center;
  }
  
  .sports-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-text h1 {
    font-size: 2rem;
  }
  
  .header-stats {
    gap: 1rem;
  }
  
  .stat-item {
    padding: 0.75rem 1rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
  
  .actions-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-filter {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .search-box {
    max-width: none;
  }
  
  .sports-grid {
    grid-template-columns: 1fr;
  }
  
  .sport-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
}

@media (max-width: 480px) {
  .sports-view {
    padding: 0.5rem;
  }
  
  .header-content {
    padding: 1.5rem;
  }
  
  .header-text h1 {
    font-size: 1.5rem;
  }
  
  .header-text p {
    font-size: 1rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .stat-item {
    padding: 0.5rem 1rem;
    width: 100%;
    justify-content: center;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-actions {
    padding: 1rem;
    flex-direction: column;
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
  }
}
</style>
