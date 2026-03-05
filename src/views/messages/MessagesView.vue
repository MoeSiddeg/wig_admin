<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import BaseCard from '@/components/ui/BaseCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { 
  Mail, 
  Users, 
  Heart, 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown,
  Eye,
  Trash2,
  Reply,
  Star,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-vue-next'

const { t } = useLocale()

// State
const messages = ref([])
const filteredMessages = ref([])
const selectedMessage = ref(null)
const isLoading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('all')
const typeFilter = ref('all')
const dateFilter = ref('all')
const activeTypeTab = ref('all')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Modal states
const showViewModal = ref(false)
const showReplyModal = ref(false)
const replyText = ref('')

// Mock data - in real app this would come from API
const mockMessages = [
  {
    id: 1,
    type: 'message',
    name: 'John Doe',
    email: 'john@example.com',
    topic: 'general',
    message: 'I have a question about the upcoming WFG26 event. Can you provide more details about the schedule?',
    status: 'unread',
    priority: 'normal',
    createdAt: '2024-03-05T10:30:00Z',
    updatedAt: '2024-03-05T10:30:00Z'
  },
  {
    id: 2,
    type: 'sponsor',
    email: 'sponsor@company.com',
    message: 'Our company is interested in sponsoring the WFG26 event. Please contact us for details.',
    status: 'unread',
    priority: 'high',
    createdAt: '2024-03-05T09:15:00Z',
    updatedAt: '2024-03-05T09:15:00Z'
  },
  {
    id: 3,
    type: 'volunteer',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    message: 'I would like to volunteer as an event coordinator. I have experience in organizing sports events.',
    status: 'replied',
    priority: 'normal',
    createdAt: '2024-03-04T14:20:00Z',
    updatedAt: '2024-03-04T16:45:00Z'
  },
  {
    id: 4,
    type: 'message',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    topic: 'technical',
    message: 'I\'m having trouble accessing the mobile app. It keeps crashing when I try to view the map.',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-03-04T11:00:00Z',
    updatedAt: '2024-03-04T11:00:00Z'
  },
  {
    id: 5,
    type: 'volunteer',
    name: 'Emily Davis',
    email: 'emily@example.com',
    message: 'I\'m a medical professional and would like to volunteer my services during the event.',
    status: 'unread',
    priority: 'high',
    createdAt: '2024-03-03T16:30:00Z',
    updatedAt: '2024-03-03T16:30:00Z'
  }
]

// Computed properties
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'pending', label: 'Pending' }
]

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'message', label: 'Messages' },
  { value: 'sponsor', label: 'Sponsors' },
  { value: 'volunteer', label: 'Volunteers' }
]

const typeTabs = [
  { value: 'all', label: 'All', icon: Mail },
  { value: 'message', label: 'Messages', icon: Mail },
  { value: 'sponsor', label: 'Sponsors', icon: Users },
  { value: 'volunteer', label: 'Volunteers', icon: Heart }
]

const dateOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' }
]

const priorityOptions = [
  { value: 'normal', label: 'Normal', color: 'blue' },
  { value: 'high', label: 'High', color: 'red' }
]

// Computed filtered messages
const computedMessages = computed(() => {
  let filtered = messages.value

  // Type tab filter (primary filter)
  if (activeTypeTab.value !== 'all') {
    filtered = filtered.filter(msg => msg.type === activeTypeTab.value)
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(msg => 
      msg.name?.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(msg => msg.status === statusFilter.value)
  }

  // Type filter (dropdown - sync with tab)
  if (typeFilter.value !== 'all') {
    filtered = filtered.filter(msg => msg.type === typeFilter.value)
  }

  // Date filter
  if (dateFilter.value !== 'all') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(msg => {
      const msgDate = new Date(msg.createdAt)
      
      switch (dateFilter.value) {
        case 'today':
          return msgDate >= today
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          return msgDate >= weekAgo
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          return msgDate >= monthAgo
        default:
          return true
      }
    })
  }

  return filtered
})

// Pagination
const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return computedMessages.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(computedMessages.value.length / itemsPerPage.value)
})

// Stats
const stats = computed(() => {
  const total = messages.value.length
  const unread = messages.value.filter(m => m.status === 'unread').length
  const pending = messages.value.filter(m => m.status === 'pending').length
  const highPriority = messages.value.filter(m => m.priority === 'high').length
  
  return { total, unread, pending, highPriority }
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}

const getStatusColor = (status) => {
  const colors = {
    unread: 'red',
    read: 'blue',
    replied: 'green',
    pending: 'yellow'
  }
  return colors[status] || 'gray'
}

const getTypeIcon = (type) => {
  const icons = {
    message: Mail,
    sponsor: Users,
    volunteer: Heart
  }
  return icons[type] || Mail
}

const getTypeLabel = (type) => {
  const labels = {
    message: 'Message',
    sponsor: 'Sponsor',
    volunteer: 'Volunteer'
  }
  return labels[type] || type
}

const getPriorityColor = (priority) => {
  return priority === 'high' ? 'red' : 'blue'
}

const viewMessage = (message) => {
  selectedMessage.value = message
  showViewModal.value = true
  
  // Mark as read if unread
  if (message.status === 'unread') {
    message.status = 'read'
    message.updatedAt = new Date().toISOString()
  }
}

const replyToMessage = (message) => {
  selectedMessage.value = message
  showReplyModal.value = true
  replyText.value = ''
}

const sendReply = async () => {
  if (!replyText.value.trim()) return
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update message status
    selectedMessage.value.status = 'replied'
    selectedMessage.value.updatedAt = new Date().toISOString()
    
    showReplyModal.value = false
    replyText.value = ''
    
    // Show success feedback
    console.log('Reply sent to:', selectedMessage.value.email)
  } catch (error) {
    console.error('Failed to send reply:', error)
  }
}

const deleteMessage = (message) => {
  if (confirm('Are you sure you want to delete this message?')) {
    const index = messages.value.findIndex(m => m.id === message.id)
    if (index > -1) {
      messages.value.splice(index, 1)
    }
  }
}

const markAsPriority = (message) => {
  message.priority = message.priority === 'high' ? 'normal' : 'high'
  message.updatedAt = new Date().toISOString()
}

const changeStatus = (message, newStatus) => {
  message.status = newStatus
  message.updatedAt = new Date().toISOString()
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  typeFilter.value = 'all'
  dateFilter.value = 'all'
  currentPage.value = 1
}

const changeTypeTab = (tabValue) => {
  activeTypeTab.value = tabValue
  typeFilter.value = tabValue // Sync dropdown with tab
  currentPage.value = 1 // Reset pagination
}

// Lifecycle
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    messages.value = mockMessages
    filteredMessages.value = mockMessages
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div class="messages-view">
    <!-- Header -->
    <div class="messages-header">
      <h1>{{ t('messages.title') }}</h1>
      <p>{{ t('messages.subtitle') }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <BaseCard class="stat-card">
        <div class="stat-content">
          <div class="stat-icon">
            <Mail :size="24" />
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-label">{{ t('messages.stats.total') }}</div>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard class="stat-card">
        <div class="stat-content">
          <div class="stat-icon unread">
            <Mail :size="24" />
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.unread }}</div>
            <div class="stat-label">{{ t('messages.stats.unread') }}</div>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard class="stat-card">
        <div class="stat-content">
          <div class="stat-icon pending">
            <Clock :size="24" />
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.pending }}</div>
            <div class="stat-label">{{ t('messages.stats.pending') }}</div>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard class="stat-card">
        <div class="stat-content">
          <div class="stat-icon high-priority">
            <Star :size="24" />
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ stats.highPriority }}</div>
            <div class="stat-label">{{ t('messages.stats.highPriority') }}</div>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Type Tabs -->
    <div class="type-tabs">
      <button
        v-for="tab in typeTabs"
        :key="tab.value"
        :class="['type-tab', { active: activeTypeTab === tab.value }]"
        @click="changeTypeTab(tab.value)"
      >
        <component :is="tab.icon" :size="18" />
        <span>{{ tab.label }}</span>
        <BaseBadge 
          :color="activeTypeTab === tab.value ? 'primary' : 'gray'" 
          size="sm"
        >
          {{ tab.value === 'all' ? messages.length : messages.filter(m => m.type === tab.value).length }}
        </BaseBadge>
      </button>
    </div>

    <!-- Filters -->
    <BaseCard class="filters-card">
      <div class="filters-header">
        <h3>{{ t('messages.filters.title') }}</h3>
        <AppButton variant="secondary" size="sm" @click="resetFilters">
          {{ t('messages.filters.reset') }}
        </AppButton>
      </div>
      
      <div class="filters-grid">
        <div class="filter-item">
          <AppInput
            v-model="searchQuery"
            :placeholder="t('messages.filters.search')"
          >
            <template #prefix>
              <Search :size="18" />
            </template>
          </AppInput>
        </div>
        
        <div class="filter-item">
          <BaseSelect
            v-model="statusFilter"
            :options="statusOptions"
            placeholder="Status"
          />
        </div>
        
        <div class="filter-item">
          <BaseSelect
            v-model="typeFilter"
            :options="typeOptions"
            placeholder="Type"
          />
        </div>
        
        <div class="filter-item">
          <BaseSelect
            v-model="dateFilter"
            :options="dateOptions"
            placeholder="Date Range"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Messages List -->
    <BaseCard class="messages-card">
      <div class="messages-header">
        <h3>{{ t('messages.list.title') }} ({{ computedMessages.length }})</h3>
      </div>
      
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>{{ t('messages.loading') }}</p>
      </div>
      
      <div v-else-if="computedMessages.length === 0" class="empty-state">
        <Mail :size="48" />
        <h3>{{ t('messages.empty.title') }}</h3>
        <p>{{ t('messages.empty.subtitle') }}</p>
      </div>
      
      <div v-else class="messages-list">
        <div
          v-for="message in paginatedMessages"
          :key="message.id"
          :class="['message-item', { unread: message.status === 'unread' }]"
          @click="viewMessage(message)"
        >
          <div class="message-main">
            <div class="message-icon">
              <component :is="getTypeIcon(message.type)" :size="20" />
            </div>
            
            <div class="message-content">
              <div class="message-header">
                <div class="message-title">
                  <span class="message-name">{{ message.name || message.email }}</span>
                  <BaseBadge :color="getStatusColor(message.status)" size="sm">
                    {{ message.status }}
                  </BaseBadge>
                  <BaseBadge :color="getPriorityColor(message.priority)" size="sm">
                    {{ message.priority }}
                  </BaseBadge>
                </div>
                <div class="message-meta">
                  <span class="message-type">{{ getTypeLabel(message.type) }}</span>
                  <span class="message-date">{{ formatDate(message.createdAt) }}</span>
                </div>
              </div>
              
              <div class="message-preview">
                {{ message.message.substring(0, 100) }}{{ message.message.length > 100 ? '...' : '' }}
              </div>
            </div>
          </div>
          
          <div class="message-actions" @click.stop>
            <AppButton variant="ghost" size="sm" @click="viewMessage(message)">
              <Eye :size="16" />
            </AppButton>
            <AppButton variant="ghost" size="sm" @click="replyToMessage(message)">
              <Reply :size="16" />
            </AppButton>
            <AppButton variant="ghost" size="sm" @click="markAsPriority(message)">
              <Star :size="16" />
            </AppButton>
            <AppButton variant="ghost" size="sm" @click="deleteMessage(message)">
              <Trash2 :size="16" />
            </AppButton>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <AppButton
          variant="secondary"
          size="sm"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </AppButton>
        
        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        
        <AppButton
          variant="secondary"
          size="sm"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </AppButton>
      </div>
    </BaseCard>

    <!-- View Message Modal -->
    <div v-if="showViewModal" class="modal-overlay" @click="showViewModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ t('messages.view.title') }}</h3>
          <AppButton variant="ghost" @click="showViewModal = false">
            <XCircle :size="20" />
          </AppButton>
        </div>
        
        <div v-if="selectedMessage" class="message-details">
          <div class="detail-row">
            <label>{{ t('messages.view.type') }}:</label>
            <span>{{ getTypeLabel(selectedMessage.type) }}</span>
          </div>
          
          <div v-if="selectedMessage.name" class="detail-row">
            <label>{{ t('messages.view.name') }}:</label>
            <span>{{ selectedMessage.name }}</span>
          </div>
          
          <div class="detail-row">
            <label>{{ t('messages.view.email') }}:</label>
            <span>{{ selectedMessage.email }}</span>
          </div>
          
          <div v-if="selectedMessage.topic" class="detail-row">
            <label>{{ t('messages.view.topic') }}:</label>
            <span>{{ selectedMessage.topic }}</span>
          </div>
          
          <div class="detail-row">
            <label>{{ t('messages.view.status') }}:</label>
            <BaseBadge :color="getStatusColor(selectedMessage.status)">
              {{ selectedMessage.status }}
            </BaseBadge>
          </div>
          
          <div class="detail-row">
            <label>{{ t('messages.view.priority') }}:</label>
            <BaseBadge :color="getPriorityColor(selectedMessage.priority)">
              {{ selectedMessage.priority }}
            </BaseBadge>
          </div>
          
          <div class="detail-row">
            <label>{{ t('messages.view.date') }}:</label>
            <span>{{ new Date(selectedMessage.createdAt).toLocaleString() }}</span>
          </div>
          
          <div class="detail-row full-width">
            <label>{{ t('messages.view.message') }}:</label>
            <div class="message-text">{{ selectedMessage.message }}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <AppButton @click="replyToMessage(selectedMessage)">
            <Reply :size="16" />
            {{ t('messages.view.reply') }}
          </AppButton>
          <AppButton variant="secondary" @click="showViewModal = false">
            {{ t('common.close') }}
          </AppButton>
        </div>
      </div>
    </div>

    <!-- Reply Modal -->
    <div v-if="showReplyModal" class="modal-overlay" @click="showReplyModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ t('messages.reply.title') }}</h3>
          <AppButton variant="ghost" @click="showReplyModal = false">
            <XCircle :size="20" />
          </AppButton>
        </div>
        
        <div v-if="selectedMessage" class="reply-form">
          <div class="reply-to">
            <label>{{ t('messages.reply.to') }}:</label>
            <span>{{ selectedMessage.email }}</span>
          </div>
          
          <AppInput
            v-model="replyText"
            type="textarea"
            :label="t('messages.reply.message')"
            rows="6"
            placeholder="Type your reply..."
          />
        </div>
        
        <div class="modal-actions">
          <AppButton @click="sendReply">
            <CheckCircle :size="16" />
            {{ t('messages.reply.send') }}
          </AppButton>
          <AppButton variant="secondary" @click="showReplyModal = false">
            {{ t('common.cancel') }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.messages-header {
  text-align: center;
  margin-bottom: 2rem;
}

.messages-header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.messages-header p {
  color: var(--color-text-medium);
  font-size: 1.1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
}

.stat-icon.unread {
  background: var(--color-red);
}

.stat-icon.pending {
  background: var(--color-orange);
}

.stat-icon.high-priority {
  background: var(--color-amber);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-dark);
  line-height: 1;
}

.stat-label {
  color: var(--color-text-medium);
  font-size: 0.9rem;
}

/* Type Tabs */
.type-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: var(--color-surface-variant);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.type-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--color-text-medium);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: var(--radius-md);
  white-space: nowrap;
  min-width: fit-content;
}

.type-tab:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--color-text-dark);
}

.type-tab.active {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.type-tab svg {
  flex-shrink: 0;
}

/* Filters */
.filters-card {
  margin-bottom: 2rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

/* Messages List */
.messages-card {
  margin-bottom: 2rem;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.message-item:hover {
  background: var(--color-surface-variant);
  border-color: var(--color-primary);
}

.message-item.unread {
  background: rgba(59, 130, 246, 0.05);
  border-left: 4px solid var(--color-primary);
}

.message-main {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.message-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-variant);
  color: var(--color-text-medium);
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.message-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.message-name {
  font-weight: 600;
  color: var(--color-text-dark);
}

.message-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  flex-shrink: 0;
}

.message-type {
  font-size: 0.85rem;
  color: var(--color-text-medium);
}

.message-date {
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.message-preview {
  color: var(--color-text-medium);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.message-actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
}

/* Loading and Empty States */
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--color-text-medium);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.page-info {
  color: var(--color-text-medium);
  font-size: 0.9rem;
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
  border-radius: var(--radius-lg);
  max-width: 600px;
  width: 100;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-dark);
}

.message-details, .reply-form {
  padding: 1.5rem;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-row.full-width {
  flex-direction: column;
}

.detail-row label {
  font-weight: 500;
  color: var(--color-text-medium);
  min-width: 100px;
  flex-shrink: 0;
}

.message-text {
  background: var(--color-surface-variant);
  padding: 1rem;
  border-radius: var(--radius-md);
  line-height: 1.6;
  white-space: pre-wrap;
}

.reply-to {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--color-surface-variant);
  border-radius: var(--radius-md);
}

.reply-to label {
  font-weight: 500;
  color: var(--color-text-medium);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .messages-view {
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .type-tabs {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .type-tab {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .messages-header h1 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .message-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .message-main {
    width: 100%;
  }
  
  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .message-meta {
    align-items: flex-start;
  }
  
  .message-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .pagination {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .detail-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .detail-row label {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .messages-view {
    padding: 0.5rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-content {
    gap: 0.75rem;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .message-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .message-actions {
    flex-wrap: wrap;
  }
  
  .type-tabs {
    padding: 0.25rem;
    gap: 0.25rem;
  }
  
  .type-tab {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    gap: 0.25rem;
  }
  
  .type-tab span {
    display: none;
  }
}
</style>
